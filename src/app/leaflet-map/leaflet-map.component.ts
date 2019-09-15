import { Component, Input, OnInit } from '@angular/core';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {latLng, LatLng, tileLayer} from 'leaflet';
import * as L from 'leaflet';
@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit {
  options;
  layersControl;
  Width ;
  Height ;
  center;
  baseMaps: any;
  overlayMaps: any;
  corner1;
  corner2;
  bounds;

  constructor() {
    const OpenStreetAttr =
      '&copy; <a href=\'http://www.openstreetmap.org/copyright\'>OpenStreetMap</a>, ' +
      'Tiles courtesy of <a href=\'http://hot.openstreetmap.org/\' target=\'_blank\'>Humanitarian OpenStreetMap Team</a>';

    this.baseMaps = {
      OpenStreetMap: L.tileLayer(
        'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        {
          zIndex: 1,
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
          detectRetina: true,
          attribution: OpenStreetAttr
        }
      ),
      Google: L.tileLayer(
        'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
        {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
          detectRetina: true
        }
      )
    };

    let generalIcon = L.Icon.extend({
      options: {
        iconSize:    [19, 47],
        iconAnchor:   [11, 47],
        popupAnchor:  [-3, -76], iconUrl: 'assets/marker-icon.png'
      }
    });
    const markerIcon = new generalIcon();
    const locationMarker = L.marker([ 49.398750 , 8.672434], {icon: markerIcon});

    this.overlayMaps = {
      'Circle': L. circle([49.398750 , 8.672434], { radius: 5000 }),
      'Polygon': L.polygon([
        [ 49.992863, 8.247253 ], [ 49.487457, 8.466040 ], [ 49.872826, 8.651193 ], [50.110924, 8.682127 ]
      ]),
      'Marker': locationMarker
    };
    this.Height = 800 + 'px';
    this.Width = '100%';
    this.center = L.latLng(49.443, 7.77161);
    this.corner1 = L.latLng(-89.98155760646617, -170);
    this.corner2 = L.latLng(89.99346179538875, 190);
    this.bounds = L.latLngBounds(this.corner1, this.corner2);

  }

  ngOnInit() {



    this.options = {
      layers: [tileLayer(
        'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href=\'http://www.openstreetmap.org/copyright\'>OpenStreetMap</a>, ' +
          'Tiles courtesy of <a href=\'http://hot.openstreetmap.org/\' target=\'_blank\'>Humanitarian OpenStreetMap Team</a>'
        }
      )],
      zoomControl: true,
      center: this.center,
      zoom: 7, // 7, //10 for us
      minZoom: 3,
      maxZoom: 18,
      maxBoundsViscosity: 1.0,
      maxBounds: this.bounds,
    };

    this.layersControl = {
      baseLayers: this.baseMaps,
      overlays: this.overlayMaps
    };
  }

  onMapReady(map) {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }

}
