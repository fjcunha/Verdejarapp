import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { ArvoreProvider } from '../../providers/arvore/arvore';
import { IEspecie } from '../../interfaces/IEspecie';
import { IArvore } from '../../interfaces/IArvore';
import { IUsuario } from '../../interfaces/IUsuario';
import { StorageProvider } from '../../providers/storage/storage';

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
  especies: IEspecie[];
  public tree:IArvore = {};
  public user:IUsuario = {};
  public imgtree:string = '';
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              public camera: Camera, private geolocation: Geolocation,
              private loadingCtrl:LoadingController ,
              private imagePicker:ImagePicker,
              private arvoreProvider: ArvoreProvider,
              private storageProvider:StorageProvider,
              ) {
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
      this.imgtree = imageData;
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
    // this.imgtree = 'assets/imgs/arvore.jpg';
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
    this.LoadUserInit();
    this.showConfirm();
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

  public LoadUserInit(){
		
		console.log("Load User");

		this.storageProvider.GetStorage('VerdejarUser').then(user=>{
	    this.user = user;
    });

		
	}

  //tentando pegar os itens do select
  initializeEspecies() {
    this.arvoreProvider.getEspecieAll().subscribe(res=>{
      console.log(res);
      this.especies = res;
    },err=>{
      console.log(err);
    })
    
  }
  ///essa daqui acho que não vai ter utilização agora
  getItemsSelect(){
    this.initializeEspecies();
    
  }

  //pegar a localização para salvar a arvore 
  getLocalizacao(){
      // debugger
      this.geolocation.getCurrentPosition().then((resp) => {
        this.tree.latitude = ''+resp.coords.latitude;
        this.tree.longitude = ''+resp.coords.longitude;
          // resp.coords.latitude;
          // resp.coords.longitude
      }).catch((error) => {
        console.log('Error getting location', error);
      });
  }

  CreateTree(){
    this.tree.user_id = this.user.id;
    console.log(this.tree);
    this.arvoreProvider.createArvore(this.tree,this.user.token).subscribe(res=>{
      console.log(res);
      if(this.imgtree != ''){
        this.arvoreProvider.uploadFoto(this.tree.id_arvore,this.imgtree,this.user.token).subscribe(result=>{
          console.log(JSON.stringify(result));
          this.navCtrl.setRoot('MyTreesPage');
        },err=>{
          console.log(JSON.stringify(err));
          this.navCtrl.setRoot('MyTreesPage');
        })
      }else{
        this.navCtrl.setRoot('MyTreesPage');
      }
    },err=>{
      console.log(err);
    })
  }

}////
// function camera() {
//   const options: CameraOptions = {
//     quality: 100,
//     destinationType: this.camera.DestinationType.FILE_URI,
//     encodingType: this.camera.EncodingType.JPEG,
//     mediaType: this.camera.MediaType.PICTURE
//   }
  
//   this.camera.getPicture(options).then((imageData) => {
//    // imageData is either a base64 encoded string or a file URI
//    // If it's base64 (DATA_URL):
//    let base64Image = 'data:image/jpeg;base64,' + imageData;
//   }, (err) => {
//    // Handle error
//   });
// }



