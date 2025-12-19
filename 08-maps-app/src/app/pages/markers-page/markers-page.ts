import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike, MapMouseEvent } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { v4 as UUIDV4 } from 'uuid'
import { JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.html',
})
export class MarkersPage implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([])

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;
    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-67.0162, 10.6101], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {

    map.on('click', (event) => { this.mapClick(event) })


    this.map.set(map)
  }

  mapClick(event: MapMouseEvent) {
    if (!this.map()) return;
    const map = this.map()!;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const coords = event.lngLat;

    const marker = new mapboxgl.Marker({
      draggable: true,
      color: color,
    })
      .setLngLat(coords)
      .addTo(map);

    const newMarker: Marker = {
      id: UUIDV4(),
      mapboxMarker: marker
    }

    // this.markers.set([newMarker, ...this.markers()]);
    this.markers.update((markers) => [newMarker, ...markers]);

    console.log(this.markers())

  }

  flyToMarker(lngLat: LngLatLike) {
    if (!this.map()) return;

    this.map()?.flyTo({
      center: lngLat
    })
  }

  deleteMarker(marker: Marker) {
    if (!this.map()) return;
    const map = this.map()!;

    marker.mapboxMarker.remove();

    this.markers.set(this.markers().filter(m => m.id !== marker.id));

  }

}
