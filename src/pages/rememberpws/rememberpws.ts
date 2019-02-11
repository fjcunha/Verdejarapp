import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';


/**
 * Generated class for the RememberpwsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rememberpws',
  templateUrl: 'rememberpws.html',
})
export class RememberpwsPage {
public email:string = "";
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private userProvider: UsuarioProvider,
    private alertCtrl: AlertController) {
  }
  RememberPassword(){
    console.log(this.email);
    let loading = this.loadingCtrl.create();
    loading.present();
    this.userProvider.EmailPassword(this.email).subscribe((res:any)=>{
      loading.dismiss();
      if(res.status == 'success'){
        this.alertCtrl.create({
          title:'Sucesso',
          message:res.message,
          buttons:['OK']
        }).present();
      }else{
        this.alertCtrl.create({
          title:'Falha ao recuperar senha',
          message:res.message,
          buttons:['OK']
        }).present();
      }
      console.log(res);
    },(err)=>{
      loading.dismiss();

      console.log(err);
      if(err.status == 401){
        this.alertCtrl.create({
          title:'Falha ao recuperar senha',
          message:err.error.message,
          buttons:['OK']
        }).present();
      }
    })
  }
  //função loading botão
  // presentLoading() {

  //   this.loadingCtrl.create({

  //     content: 'Please wait...',

  //     duration: 3000,

  //     dismissOnPageChange: true

  //   }).present();

  // }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RememberpwsPage');
  }

}
