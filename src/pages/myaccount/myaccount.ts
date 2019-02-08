import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { IUsuario } from '../../interfaces/IUsuario';

/**
 * Generated class for the MyaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myaccount',
  templateUrl: 'myaccount.html',
})
export class MyaccountPage {
  public minhaContaAlterarInput:boolean = true;
  public minhaContaBotaoAlterarMostrar:boolean = true;
  public minhaContaBotaoSalvarMostrar:boolean = false;

  userInfos: IUsuario = {Trees : []};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storageProvider:StorageProvider
              , public menuCtrl: MenuController) {


    this.LoadUserInit();

  }

  AtivarInput(){
    if (this.minhaContaBotaoAlterarMostrar == true){
      this.minhaContaAlterarInput = false;
      this.minhaContaBotaoAlterarMostrar = false;
      this.minhaContaBotaoSalvarMostrar = true;
    }
    else{
      this.minhaContaAlterarInput = true;
      this.minhaContaBotaoAlterarMostrar = true;
      this.minhaContaBotaoSalvarMostrar = false;
    }

  }

  ionViewWillEnter() {

    this.LoadUserInit();

  }

  public LoadUserInit(){

    console.log("Load User");

    this.storageProvider.GetStorage('VerdejarUser').then(user=>{
          if(user != null) {
            console.log(user);
              console.log('Logado');
          this.userInfos = user;
          this.menuCtrl.enable(true, 'Auth');
      }
      else{
        console.log("Não logado");
        this.navCtrl.setRoot('LoginPage');
      }
      console.log(this.userInfos.Trees);
      });


  }

  public openNovaArvore() {
    this.navCtrl.setRoot('NewtreePage');
  }
}
