import { Component, input } from '@angular/core';
import { Input, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import { Feature } from 'ol';
import { Vector as VectorSource } from 'ol/source';
import { Point } from 'ol/geom';
import { Icon, Style } from 'ol/style';
import { useGeographic } from 'ol/proj';
import { MapCodingServiceService } from '../../Services/map-coding-service/map-coding-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-coordinate-picker-component',
  templateUrl: './coordinate-picker-component.component.html',
  styleUrl: './coordinate-picker-component.component.scss'
})
export class CoordinatePickerComponentComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() address: string | null = null;
  @Input() mapCordinates: [number, number] | null = null; // [lng, lat]
  @Output() addressSelected = new EventEmitter();

  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef<HTMLDivElement>;

  private map!: Map;
  private markerLayer!: VectorLayer<VectorSource>;
  private browser = false;
  private preloadQueue: [number, number][] = [];
  private isPreloading = false;
  private subscription = new Subscription();

  // Default center (Tbilisi) when empty
  private readonly fallbackLat = 41.7151;
  private readonly fallbackLng = 44.8271;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private mapService: MapCodingServiceService
  ) {
    this.browser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
  if (!this.browser) return; // avoid during prerender

  useGeographic(); // lon/lat in degrees

  if (this.mapCordinates && this.mapCordinates[0] && this.mapCordinates[1]) {
    // ✅ Use coordinates if provided
    const lng = Number(this.mapCordinates[0]);
    const lat = Number(this.mapCordinates[1]);
    this.initMap([lng, lat]);
    this.addMarker([lng, lat]);
  } else if (this.address && this.address.trim()) {
    // ✅ Address fallback

    this.initMapAtTbilisi(); 
  } else {
    // ✅ Default fallback
    this.initMapAtTbilisi();
    this.addMarker([this.fallbackLng, this.fallbackLat]);
  }

  // Map click → get address and emit it
 this.map.on('click', (evt) => {
  const [lng, lat] = evt.coordinate as [number, number];
  this.subscription.add(
    this.mapService.reverseGeocode(lat, lng).subscribe(address => {
      this.addressSelected.emit({ address, coords: [lng, lat] });
    })
  );
});


  setTimeout(() => {
    this.map.updateSize();
    this.startPreloading([this.fallbackLng, this.fallbackLat]);
  }, 200);
}


 ngOnChanges(changes: SimpleChanges): void {
  if (!this.map || !this.browser) return;

  if (changes['mapCordinates'] && this.mapCordinates && this.mapCordinates[0] && this.mapCordinates[1]) {
    const lng = Number(this.mapCordinates[0]);
    const lat = Number(this.mapCordinates[1]);

    if (!isNaN(lng) && !isNaN(lat)) {

      this.animateToLocation([lng, lat]);
      if (this.markerLayer) {
        this.updateMarker([lng, lat]);
      } else {
        this.addMarker([lng, lat]);
      }
    }
  }

  if (changes['address'] && this.address && this.address.trim()) {
    this.subscription.add(
      // this.mapService.forwardGeocode(this.address).subscribe(...)
    );
  }
}


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initMapAtTbilisi(): void {
    this.initMap([this.fallbackLng, this.fallbackLat]);
  }

  private initMap(centerLonLat: [number, number]): void {
    this.map = new Map({
      target: this.mapContainer.nativeElement,
      layers: [
        new TileLayer({ source: new OSM() })
      ],
      view: new View({ center: centerLonLat, zoom: 14 }),
      controls: [],
    });
  }

  private addMarker(lonLat: [number, number]): void {
    const feature = new Feature({ geometry: new Point(lonLat) });
    feature.setStyle(new Style({
      image: new Icon({
        src: 'assets/Imges/CardDetailed/map.png',
        scale: 1.2,
        anchor: [0.5, 1],
      })
    }));

    const source = new VectorSource({ features: [feature] });
    this.markerLayer = new VectorLayer({ source });
    this.map.addLayer(this.markerLayer);
  }

  private updateMarker(lonLat: [number, number]): void {
    if (!this.markerLayer) return;
    const src = this.markerLayer.getSource();
    if (!src) return;
    src.clear();
    const f = new Feature({ geometry: new Point(lonLat) });
    f.setStyle(new Style({
      image: new Icon({ 
        src: 'assets/Imges/CardDetailed/map.png', 
        scale: 1.2, 
        anchor: [0.5, 1] 
      })
    }));
    src.addFeature(f);
  }

  private animateToLocation(lonLat: [number, number]): void {
    const view = this.map.getView();
    view.animate({
      center: lonLat,
      duration: 800, // 800ms smooth animation
      easing: (t: number) => 1 - Math.pow(1 - t, 3) // Ease-out cubic for smooth deceleration
    });
    
    // Only preload after animation completes + delay
    setTimeout(() => this.startPreloading(lonLat), 1200);
  }

  private startPreloading(centerLonLat: [number, number]): void {
    if (this.isPreloading) return;
    
    const [centerLng, centerLat] = centerLonLat;
    const radius = 0.005; // Smaller radius - ~500m for less aggressive preloading
    
    // Generate smaller grid of nearby coordinates
    this.preloadQueue = [];
    for (let latOffset = -radius; latOffset <= radius; latOffset += radius) {
      for (let lngOffset = -radius; lngOffset <= radius; lngOffset += radius) {
        if (latOffset === 0 && lngOffset === 0) continue; // Skip center
        this.preloadQueue.push([
          centerLng + lngOffset,
          centerLat + latOffset
        ]);
      }
    }
    
    // Start gentle preloading
    this.preloadNextTile();
  }

  private preloadNextTile(): void {
    if (this.preloadQueue.length === 0) {
      this.isPreloading = false;
      return;
    }
    
    this.isPreloading = true;
    
    // Much gentler preloading
    const preloadFn = () => {
      if (this.preloadQueue.length === 0) return;
      
      const [lng, lat] = this.preloadQueue.shift()!;
      
      // Very quick tile hint without view switching
      const tempView = new View({
        center: [lng, lat],
        zoom: this.map.getView().getZoom()
      });
      
      // Just briefly reference the view to hint tile loading
      tempView.getCenter();
      
      // Continue with much longer delay between preloads
      setTimeout(() => this.preloadNextTile(), 300);
    };
    
    // Always use longer timeout to be gentler
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(preloadFn, { timeout: 2000 });
    } else {
      setTimeout(preloadFn, 500);
    }
  }
}