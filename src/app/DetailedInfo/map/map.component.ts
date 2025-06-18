import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';

import 'ol/ol.css';
import { OSM } from 'ol/source';
import { View } from 'ol';
import { Map } from 'ol';
import { Tile } from 'ol/layer';
import { useGeographic } from 'ol/proj';
import { isPlatformBrowser } from '@angular/common';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Icon, Style } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { PropertyInformationService } from '../../Services/Property-info/property-information.service';

import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  map: Map | undefined;
  loc='location';
  lat; // Latitude from the service
  long; // Longitude from the service
  @ViewChild('mapContainer', { static: false }) mapContainer: ElementRef | undefined;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private service: PropertyInformationService,
    private lang: LanguageChooserService
  ) {
    this.loc=this.lang.chosenLang.DetailedInfo.map;
  }

  ngOnInit(): void {
    this.service.chosenCard.subscribe((card) => {
      this.lat = card.latitude;
      this.long = card.longitude;
    })
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
    }
  }

  initializeMap(): void {
    const mapContainer = this.mapContainer?.nativeElement;

    if (mapContainer) {
      // Enable geographic coordinates (longitude, latitude)
      useGeographic();

      // Initialize the map
      this.map = new Map({
        target: mapContainer,
        layers: [
          new Tile({
            source: new OSM(),
          }),
        ],
        controls: [],
        view: new View({
          center: [this.long,this.lat], // Center using service-provided coordinates
          zoom: 14,
        }),

      });

      // Add a custom marker at the given coordinates
      this.addMarker([this.long,this.lat]);

      // Ensure the map renders properly in the DOM
      setTimeout(() => {
        this.map?.updateSize();
      }, 100);
    }
  }

  addMarker(coordinates: [number, number]): void {
    // Create a feature for the marker
    const marker = new Feature({
      geometry: new Point(coordinates),
    });

    // Style the marker with a custom icon
    const markerStyle = new Style({
      image: new Icon({
        src: 'assets/Imges/CardDetailed/map.png', // Path to marker icon
        scale: 1.2, // Adjust the scale as needed
        anchor: [0.5, 1], // Anchors the icon at its bottom center
      }),
    });

    marker.setStyle(markerStyle);

    // Create a vector source to hold the marker
    const vectorSource = new VectorSource({
      features: [marker],
    });

    // Create a vector layer to render the marker
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      
    });

    // Add the vector layer (with marker) to the map
    this.map?.addLayer(vectorLayer);
  }
}
