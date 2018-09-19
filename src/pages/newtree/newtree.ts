import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the NewtreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;
@IonicPage()
@Component({
  selector: 'page-newtree',
  templateUrl: 'newtree.html',
})
export class NewtreePage {
  especies: object[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              public camera: Camera, private geolocation: Geolocation,
              private loadingCtrl:LoadingController ,
              private imagePicker:ImagePicker) {
  }


  upload(URIimage, fileName) {
    let loading = this.loadingCtrl.create();
    loading.present();
    // this.userService.Upload(URIimage, fileName).then(res => {
    //   loading.dismiss();
    //   console.log("result UPLOAD");
    //   console.log(res);
    //   if (JSON.stringify(res).indexOf('sucesso') != -1) {
    //     let alertMessage = this.alertCtrl.create({
    //       title: 'Imagem enviada',
    //       subTitle: 'Sua imagem de perfil foi atualizada',
    //       buttons: ['OK']
    //     });
    //     alertMessage.present();
    //   } else {
    //     let alertMessage = this.alertCtrl.create({
    //       title: 'Falhar ao enviar imagem',
    //       subTitle: 'Erro ao enviar imagem para o servidor',
    //       buttons: ['OK']
    //     });
    //     alertMessage.present();
    //   }
    // },
    //   err => {
    //     loading.dismiss();
    //     console.log(err);
    //     let alertMessage = this.alertCtrl.create({
    //       title: 'Falhar ao enviar imagem',
    //       subTitle: 'Erro ao enviar imagem para o servidor',
    //       buttons: ['OK']
    //     });
    //     alertMessage.present();
    //   })
  }

  takePicture() {
    console.log("get picture from camera");
    let options = {
      targetWidth: 500,
      targetHeight: 500
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      //this.user.profileImg = imageData;
      //this.upload(imageData, this.user.cpf + ".jpg");
    }, (err) => {
      console.log("Error get camera picture:");
      console.log(err);
    });
  }

  getPicture() {
    console.log("get picture from galery");
    let options = {
      maximumImagesCount: 1,
      width: 500,
      height: 500
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        // this.user.profileImg = results[i];
        // this.upload(results[i], this.user.cpf + ".jpg");
      }
    }, (err) => {
      console.log("Error get picker picture:");
      console.log(err);
     });
  }

  changePicture() {
    let alert = this.alertCtrl.create({
      title: 'Escolher Foto da árvore',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Galeria',
          handler: () => {
            this.getPicture();
          }
        }
      ]
    });
    alert.present();
  }


  //pedindo permissão para geolocalização
  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Permissão de Geolocalização',
      message: 'Para cadastrar uma arvore é necessário obter sua localização. Você nos permite obter sua localização?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Disagree clicked');
            //alert("vc apertou falso");
            this.navCtrl.setRoot('MapsPage');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            console.log('Agree clicked');
            //alert("vc aperteou verdadeiro");
            this.getLocalizacao();           
          
          }
        }
      ]
    });
    confirm.present();
  }

  ionViewDidLoad() {
    this.initializeEspecies();
    this.showConfirm();
    console.log('ionViewDidLoad NewtreePage');
  }

  voltarPagina(){
    this.navCtrl.pop();
  }
  chamarCamera(){
    // debugger
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;


     }, (err) => {
      // Handle error
     });
    

  }

  //tentando pegar os itens do select
  initializeEspecies() {
    var  esp = {};
    this.especies = [
        esp = {key: 1, especie:"especie 1"},
        esp = {key: 2, especie:"especie 2"},
        esp = {key: 3, especie:"especie 3"},
        esp = {key: 4, especie:"especie 4"},
        esp = {key: 5, especie:"especie 5"},
    
    ];
  }
  ///essa daqui acho que não vai ter utilização agora
  getItemsSelect(){
    this.initializeEspecies();
    
  }

  //pegar a localização para salvar a arvore 
  getLocalizacao(){
      debugger
      this.geolocation.getCurrentPosition().then((resp) => {
          // resp.coords.latitude;
          // resp.coords.longitude
      }).catch((error) => {
        console.log('Error getting location', error);
      });
  }
}////
function camera() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64 (DATA_URL):
   let base64Image = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
   // Handle error
  });

  

  
}

