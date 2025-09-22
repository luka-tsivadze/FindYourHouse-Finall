import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';

export interface GeocodingRequest {
  mapis_grdzedi ?: number;
  mapis_ganedi ?: number;
  address?: string;
}

export interface GeocodingResponse {
  success: boolean;
  mtliani_misamarti?: string;
  qucha?: string;
  nomeri?: string;
  lat?: number;
  lng?: number;
  display_name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapCodingServiceService {
  constructor(private http: HttpClient) {}

  /**
   * Reverse Geocoding: Convert coordinates to address
   * Called when user clicks on map
   */
  reverseGeocode(lat: number, lng: number): Observable<string> {
    const payload: GeocodingRequest = { mapis_grdzedi:lat ,  mapis_ganedi:lng };
    
    return this.http.post<GeocodingResponse>('get-street-location.php ', payload)
      .pipe(
        map(response => {
          if (response.success) {

            return response.qucha + ' ' + response.nomeri;
          }
                return ``;
        }),
        catchError(error => {
          console.warn('Reverse geocoding failed:', error);
          return of(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        })
      );
  }

  /**
   * Forward Geocoding: Convert address to coordinates
   * Called when user types address in input
   */
  forwardGeocode(address: string): Observable<{lat: number, lng: number, address: string} | null> {
    const payload: GeocodingRequest = { address };
    
    return this.http.post<GeocodingResponse>('/api/geocode', payload)
      .pipe(
        map(response => {
          if (response.success && response.lat && response.lng) {
            return {
              lat: response.lat,
              lng: response.lng,
              address: response.display_name || address
            };
          }
          return null;
        }),
        catchError(error => {
          console.warn('Forward geocoding failed:', error);
          return of(null);
        })
      );
  }
}