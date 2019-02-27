import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { ArvoreProvider } from '../../providers/arvore/arvore';
import { IEspecie } from '../../interfaces/IEspecie';
import { IArvore } from '../../interfaces/IArvore';
import { IUsuario } from '../../interfaces/IUsuario';
import { StorageProvider } from '../../providers/storage/storage';
import { Crop } from '@ionic-native/crop';

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
              private crop:Crop,
              private menuCtrl:MenuController
              ) {
  }

  CropImage(imgAddress){
    this.crop.crop(imgAddress, {quality: 75})
  .then(
      newImage => {
        console.log('new image path is: ' + newImage);
        this.imgtree = newImage;
      },
      error => console.error('Error cropping image', error)
    );
  }

  takePicture() {
    console.log("get picture from camera");
    let options:CameraOptions  = {
      targetWidth: 500,
      targetHeight: 500,
      correctOrientation:true,
      quality:70
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      this.imgtree = imageData;
      this.CropImage(this.imgtree);

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
    let options:ImagePickerOptions = {
      maximumImagesCount: 1,
      width: 500,
      height: 500,
    };
    this.imagePicker.getPictures(options).then((results) => {
      this.imgtree = results[0];
      this.CropImage(this.imgtree);

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
    // this.showConfirm();
    this.getLocalizacao();
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
		this.storageProvider.GetStorage('VerdejarUser').then(user=>{
      if(user != null) {

        console.log('Logado');
        this.user = user;
        this.menuCtrl.enable(true, 'Auth');
        this.menuCtrl.enable(false, 'NotAuth');
			}
			else{
				console.log("Não logado");
				this.menuCtrl.enable(false, 'Auth');
        this.menuCtrl.enable(true, 'NotAuth');
        this.navCtrl.setRoot('LoginPage');
			}
    });
	}

  //tentando pegar os itens do select
  initializeEspecies() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.arvoreProvider.getEspecieAll().subscribe(res=>{
      loading.dismiss();
      console.log(res);
      this.especies = res;
    },err=>{
      loading.dismiss();
      console.log(err);
    })
    
  }
  ///essa daqui acho que não vai ter utilização agora
  getItemsSelect(){
    this.initializeEspecies();
    
  }

  //pegar a localização para salvar a arvore 
  getLocalizacao(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(JSON.stringify(resp));
      this.tree.Latitude = ''+resp.coords.latitude;
      this.tree.Longitude = ''+resp.coords.longitude;
        // resp.coords.latitude;
        // resp.coords.longitude
    }).catch((error) => {
      let confirm = this.alertCtrl.create({
        title: 'Falha na localização',
        message: 'Por favor, verifique as configurações do seu dispositivo.',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });

      confirm.present();
      console.log('Error getting location', error);
    });
  }

  CreateTree(){
    console.log(this.tree);

    if(this.tree.SpecieID == 0 || this.tree.SpecieID == null){
      this.alertCtrl.create({title:'Escolha uma espécie',buttons:['OK']}).present();
      return;
    }

    if(this.imgtree == null || this.imgtree.trim() == ''){
      this.alertCtrl.create({title:'Selecione uma foto para a árvore.',buttons:['OK']}).present();
      return;
    }

    if(this.tree.Latitude == null || this.tree.Latitude.trim() == '' ||
       this.tree.Longitude == null || this.tree.Longitude.trim() == ''){
        this.alertCtrl.create({title:'Erro Localização',message:'Falha ao pegar localização, verifique suas permissões e configurações de GPS.',buttons:['OK']}).present();
        return;
    }

    this.tree.UserID = this.user.UserID;
    console.log(JSON.stringify(this.tree));
    let loading = this.loadingCtrl.create();
    loading.present();
    this.arvoreProvider.createArvore(this.tree).subscribe(res=>{
      loading.dismiss();

      console.log(JSON.stringify(res));
      if(this.imgtree != ''){
        let loadUpload = this.loadingCtrl.create({content:'Upload de foto'});
        loadUpload.present();
        this.arvoreProvider.uploadFoto(res.TreeID,this.imgtree,res.TreeID+'.jpg').then(result=>{
          loadUpload.dismiss();

          console.log(JSON.stringify(result));
          this.navCtrl.setRoot('MyTreesPage');
        },err=>{
          loadUpload.dismiss();

          console.log(JSON.stringify(err));
          this.navCtrl.setRoot('MyTreesPage');
        })
      }else{
        this.navCtrl.setRoot('MyTreesPage');
      }
    },err=>{
      loading.dismiss();
      console.log(err);
    })
  }

}