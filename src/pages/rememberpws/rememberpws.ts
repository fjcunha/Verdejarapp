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
      if(res.token){
        this.alertCtrl.create({
          title:'Sucesso',
          message:'O processo foi concluido com sucesso. <br /> Token: '+res.token,
          buttons:['OK']
        }).present();
      }
      console.log(res);
    },(err)=>{
      loading.dismiss();

      console.log(err);
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
