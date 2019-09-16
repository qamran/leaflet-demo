import { Component, Input, OnInit } from '@angular/core';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {latLng, LatLng, tileLayer} from 'leaflet';
import * as L from 'leaflet';
declare var HeatmapOverlay;
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
  heatMapLayer;

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

    const heatmapdata = {
      data: [
        {lat: 49.447057436517056, lng: 7.7571002115249635, count: 500},
        {lat: 49.44158436517056, lng: 7.75272002115249635, count: 500},
        {lat: 49.447059436517056, lng: 7.7537002115249635, count: 500},
        {lat: 49.4427067436517056, lng: 7.75475002115249635, count: 500},
        {lat: 49.44570627436517056, lng: 7.7567002115249635, count: 500},
        {lat: 50.75, lng: -1.55, count: 1},
        {lat: -37.8210922667, lng: 175.2209316333, count: 200},
        {lat: -37.82110819833, lng: 175.2213903167, count: 300},
        {lat: -37.8211946833, lng: 175.2213655333, count: 100},
        {lat: -37.8209458667, lng: 175.2214051333, count: 50},
        {lat: -37.8208292333, lng: 175.2214374833, count: 700},
        {lat: -37.8325816, lng: 175.2238798667, count: 537},
        {lat: -37.8096336833, lng: 175.2223743833, count: 176}
      ]};

    this.heatMapLayer = new HeatmapOverlay({
      radius: 10,
      maxOpacity: 0.8,
      useLocalExtrema: true,
      latField: 'lat', // attribute in json
      lngField: 'lng', // attribute in json
      valueField: 'count' // attribute in json
    });
    this.heatMapLayer.setData(heatmapdata);

    this.overlayMaps = {
      'Circle': L. circle([49.398750 , 8.672434], { radius: 5000 }),
      'Polygon': L.polygon([
        [ 49.992863, 8.247253 ], [ 49.487457, 8.466040 ], [ 49.872826, 8.651193 ], [50.110924, 8.682127 ]
      ]),
      'Marker': locationMarker,
      'Heatmap': this.heatMapLayer
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
