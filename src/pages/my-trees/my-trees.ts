import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { IUsuario } from '../../interfaces/IUsuario';
import { StorageProvider } from '../../providers/storage/storage';
import { UsuarioProvider } from '../../providers/usuario/usuario';

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
              private menuCtrl:MenuController,
              private customerProvider:UsuarioProvider) {
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
        this.GetUserData(this._customer.token);
      }
      else{
        console.log("Não logado");
        this.menuCtrl.enable(false, 'Auth');
        this.menuCtrl.enable(true, 'NotAuth');
      }
    });		
  }
  
  GetUserData(token:string){
		this.customerProvider.UserData(this._customer.token).subscribe(retorno => {
				//Salva os dados dentro do banco de dados
				this._customer = retorno;
				this._customer.token = token;
				this.storageProvider.SetStorage('VerdejarUser', this._customer);
				this.menuCtrl.enable(true, 'auth');
				this.menuCtrl.enable(false, 'unauth');
				//this.dismissLoading();
			//this.navCtrl.setRoot('TabsPage');
			}
			,
			erro => {
				//this.dismissLoading();
				//this.presentToast(erro.error, 'middle');
			}
		
		);
	}

}
