import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GESTURE_PRIORITY_TOGGLE } from 'ionic-angular/umd/gestures/gesture-controller';

/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var google;
 declare var MarkerClusterer;
@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private platform: Platform ) {
        
  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
 
        const mapOptions = {
          zoom: 14,
          center: position
        }
 
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        /*const marker = new google.maps.Marker({
          position: position,
          map: this.map,          
        }); */
        
        /* const position2 = new google.maps.LatLng(-20.543346654419498,-47.402669669004695);
        const marker2 = new google.maps.Marker({
          position: position2,
          map: this.map,
          icon: 'assets/icon/icon.png'
        });*/
        
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';//só pra teste, saber diferenciar o marcador.
        var locations = [
          {lat: -20.543346654419498, lng: -47.402669669004695},
          {lat: resp.coords.latitude,lng: resp.coords.longitude},
          {lat: -20.557087592592957, lng: -47.363637512628145},
          {lat: -20.548749472523543, lng: -47.366866892282076}, 
          {lat: -20.525611906909997, lng: -47.38339862672643},
          {lat: -20.524423789505583, lng: -47.36095200471573},
          {lat: -20.512771579741226, lng: -47.39222216268058} 
        ]

        var image = 'assets/icon/icon_50.ico';
        var markers = locations.map(function(location, i) {
          return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length],
            icon: image
          });
        });
        var markerCluster = new MarkerClusterer(this.map, markers,
          {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        
 
      }).catch((error) => {
        console.log('Erro ao recuperar sua posição', error);
      });
  }

}
