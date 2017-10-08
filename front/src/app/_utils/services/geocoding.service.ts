import { createClient, GoogleMapsClient } from '@google/maps';
import { Injectable } from '@angular/core';

@Injectable()
export class GeoCodingService {

  private geoCoder: GoogleMapsClient

  public constructor() {
    this.geoCoder = createClient({
      key: 'AIzaSyCn5M684ZDoTqQwaoZxMTasOlo7uuVvQ7E'
    })
  }

  public geocodeAddress(adress): Promise<google.maps.GeocoderResult[]> {

    const request: google.maps.GeocoderRequest = {
      address: adress
    }

    return new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
      this.geoCoder.geocode(request, (error, response) => {
        if (error) reject(error)
        resolve(response.json.results)
      })
    })
  }
}
