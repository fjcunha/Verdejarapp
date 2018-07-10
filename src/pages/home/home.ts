import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ArvoreProvider } from '../../providers/arvore/arvore'
import { IArvore } from '../../interface/IArvore';
import { IConfig } from '../../interface/IConfig';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	_arvores: IArvore[];
	_confgis:IConfig;
	_imgPaths = "http://mercado8.dlinkddns.com/verdejar/public/images/a/";
  constructor(public navCtrl: NavController, public providerArvore: ArvoreProvider,public storageProvider: StorageProvider) {

  	this.providerArvore.getAll().subscribe(retorno => {

  		console.log(retorno);
				//Salva os dados dentro do banco de dados
				this._arvores = retorno;
				this.storageProvider.SetStorage('VerdejarAvores', this._arvores);
			},error=>{
				console.log(error.error);
				console.log(error.texte);
			}
	);

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
