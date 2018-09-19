import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GESTURE_PRIORITY_TOGGLE } from 'ionic-angular/umd/gestures/gesture-controller';
import { AlertController } from 'ionic-angular';

import { NewtreePage } from '../newtree/newtree';
import { IArvore } from '../../interfaces/IArvore';
import { ArvoreProvider } from '../../providers/arvore/arvore';
import { StorageProvider } from '../../providers/storage/storage';
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
  //para o searchbar
  searchQuery: string = '';
  items: string[];
  _arvores:IArvore[];
  //do video
  public isSearchbarOpened = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private geolocation: Geolocation, private platform: Platform, 
              public alertCtrl: AlertController,
              private providerArvore:ArvoreProvider,
              private storageProvider:StorageProvider) 
  {
    //this.initializeItems();
  }

  

  ionViewDidLoad() {
    this.showConfirm();
    }

    //pegar permissão para geolocalização
    showConfirm() {
      const confirm = this.alertCtrl.create({
        title: 'Permissão de Geolocalização',
        message: 'Você permite esse aplicativo a obter sua geolocalização?',
        buttons: [
          {
            text: 'Não',
            handler: () => {
              console.log('Disagree clicked');
             // alert("vc apertou falso");
            }
          },
          {
            text: 'Sim',
            handler: () => {
              console.log('Agree clicked');
              //alert("vc aperteou verdadeiro");
              this.mostrarMata();

            }// fim handler antes do codigo 
          }
        ]
      });
      
      confirm.present();
    }

    public LoadArvores(){

      console.log('Carrega arvores');
  
      this.providerArvore.getAll().subscribe(retorno => {
  
        console.log(retorno);
          //Salva os dados dentro do banco de dados
          this._arvores = retorno;
          // this.storageProvider.SetStorage('VerdejarAvores', this._arvores);
          this.geolocation.getCurrentPosition()
          .then((resp) => {
            const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
     
            const mapOptions = {
              zoom: 14,
              center: position,
              disableDefaultUI:true,
              zoomControl:true,
              zoomControlOptions: {
                style:google.maps.ZoomControlStyle.SMALL,
                position:google.maps.ControlPosition.RIGHT_CENTER
            }
            }
     
            this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
            //deixando o marcador da pessoa. pra saber onde ela esta
            const marker = new google.maps.Marker({
              position: position,
              map: this.map,          
            }); 
            
            var locations = this._arvores.map(element=>{
              return {lat: parseFloat(element.latitude),lng:parseFloat(element.longitude)}
            });
            console.log(locations);
    
            var image = 'assets/icon/icon_50.ico';
            var markers = locations.map(function(location, ) {
              return new google.maps.Marker({
                position: location,            
                icon: image
              });
            });
    
            //var markerCluster = new MarkerClusterer(this.map, markers,
            //  {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
            
            var markerCluster = new MarkerClusterer(this.map, markers,
                {imagePath: 'assets/icon/grupo'});
          }).catch((error) => {
            console.log('Erro ao recuperar sua posição', error);
          });

        },error=>{
          console.log(error.error);
          console.log(error.texte);
      });
    }

    ////mostar mapa
    mostrarMata(){
      this.LoadArvores();
    }
    
    //para o searchbar
    initializeItems() {
      this.items = [
        'Amsterdam',
        'Bogota',
        'Flavia',
        'Josi',
        'Natalia',
        'Cleusa',
      
      ];
    }
    //continuação searchbar
    
    getItems(ev: any) {
      // Reset items back to all of the items
      this.initializeItems();
  
      // set val to the value of the searchbar
      const val = ev.target.value;
  
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
    
    

    //do video
    onSearch(event){
      this.initializeItems();
      const val = event.target.value;
      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }

    paginaNovaArvore(){
    
      this.navCtrl.push('NewtreePage');
    }

}
