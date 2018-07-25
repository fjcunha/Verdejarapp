import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { IConfig } from '../../interfaces/IConfig';
import { IArvore } from '../../interfaces/IArvore';
import { StorageProvider } from '../../providers/storage/storage';
import { ArvoreProvider } from '../../providers/arvore/arvore';

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
	_imgPaths = "http://mercado8.dlinkddns.com/verdejar/public/images/a/";
  constructor(public navCtrl: NavController, 
    public providerArvore: ArvoreProvider,
    public storageProvider: StorageProvider,
  private app:App) {

    this.storageProvider.GetStorage('VerdejarUser').then(user=>{
      if(user == null) {
        let nav = this.app.getRootNav();
        nav.setRoot('LoginPage');
      }
    })

  	this.providerArvore.getAll().subscribe(retorno => {

  		console.log(retorno);
				//Salva os dados dentro do banco de dados
				this._arvores = retorno;
				this.storageProvider.SetStorage('VerdejarAvores', this._arvores);
			},error=>{
				console.log(error.error);
				console.log(error.texte);
			});

	this.providerArvore.getConfig().subscribe(retorno => {
		console.log(retorno);
				//Salva os dados dentro do banco de dados
				this._confgis = retorno;
				this.storageProvider.SetStorage('VerdejarConfigs', this._confgis);
			}
			,error=>{
				console.log(error.error);
				console.log(error.texte);
			}
	);


  }

  ionViewDidLoad() {
	
	}
}
