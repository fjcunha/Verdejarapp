import { Component } from '@angular/core';
import { App,IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { IConfig } from '../../interfaces/IConfig';
import { IArvore } from '../../interfaces/IArvore';
import { StorageProvider } from '../../providers/storage/storage';
import { ArvoreProvider } from '../../providers/arvore/arvore';
import { IUsuario } from '../../interfaces/IUsuario';
import { TreePageModule } from '../tree/tree.module';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  	_arvores: IArvore[];
	_confgis:IConfig;
	user:IUsuario;

	loading;
 
	_imgPaths = "http://mercado8.dlinkddns.com/verdejar/public/images/a/";
  

  	constructor(public navCtrl: NavController, public providerArvore: ArvoreProvider,
			    public toastController: ToastController, public storageProvider: StorageProvider,
			    public loadingCtrl: LoadingController, public menuCtrl: MenuController, private app:App) {

 
	}
	
	public LoadUserInit(){
		
		console.log("Load User");

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
        this.app.getRootNav().setRoot('LoginPage');
			}
	    });

		
	}

	public LoadConfigs(){

		console.log("Loag Config");
		
		this.providerArvore.getConfig().subscribe(retorno => {
			console.log(retorno);
					//Salva os dados dentro do banco de dados
					this._confgis = retorno[0];
					this.storageProvider.SetStorage('VerdejarConfigs', this._confgis);
				}
				,error=>{
					console.log(error.error);
					console.log(error.texte);
				}
		);
	}

	public LoadArvores(){

		console.log('Carrega arvores');

		this.providerArvore.getAll().subscribe(retorno => {

	  		console.log(retorno);
					//Salva os dados dentro do banco de dados
					this._arvores = retorno;
					this.storageProvider.SetStorage('VerdejarAvores', this._arvores);
				},error=>{
					console.log(error.error);
					console.log(error.texte);
		});
	}

	ionViewCanLoad(){
		
	}

  ionViewDidLoad() {
		this.LoadUserInit();
  		this.LoadArvores();
  		this.LoadConfigs();
	}
}
