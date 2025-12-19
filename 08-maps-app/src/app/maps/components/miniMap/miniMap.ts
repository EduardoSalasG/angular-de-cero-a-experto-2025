import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike, MapMouseEvent, Marker } from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './miniMap.html',
  styles: `
    div{
      width: 100%;
      height: 260px;
    }
  `
})
export class MiniMap implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  coords = input.required<LngLatLike>()
  zoom = input<number>(14)

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;
    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.coords(), // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
      interactive: false,
      pitch: 30,
    });

    new mapboxgl.Marker()
      .setLngLat(this.coords())
      .addTo(map);
  }

}
