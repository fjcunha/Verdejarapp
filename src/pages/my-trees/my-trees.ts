import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { IUsuario } from '../../interfaces/IUsuario';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the MyTreesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-trees',
  templateUrl: 'my-trees.html',
})
export class MyTreesPage {
  _customer:IUsuario = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storageProvider:StorageProvider,
              private menuCtrl:MenuController) {
  }

  ionViewDidLoad() {
    this.LoadUserInit();
  }

  public LoadUserInit(){
		this.storageProvider.GetStorage('VerdejarUser').then(user=>{
      if(user != null) {

        console.log('Logado');
        this._customer = user;
        this.menuCtrl.enable(true, 'Auth');
        this.menuCtrl.enable(false, 'NotAuth');

        console.log(this._customer);
      }
      else{
        console.log("Não logado");
        this.menuCtrl.enable(false, 'Auth');
        this.menuCtrl.enable(true, 'NotAuth');
      }
    });		
	}

}
