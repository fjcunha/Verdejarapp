import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IArvore } from '../../interfaces/IArvore';
import { IEspecie } from '../../interfaces/IEspecie';
import { IFoto } from '../../interfaces/IFotos';
import { IConfig } from '../../interfaces/IConfig';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import {Observable} from 'rxjs/Observable'
import { Storage } from '@ionic/storage';
import { ApiUrlProvider } from '../api-url/api-url';

/*
  Generated class for the ArvoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArvoreProvider {

  APIURL = ApiUrlProvider.GetUrl();
	headers = new HttpHeaders();
  token: string = ApiUrlProvider.GetToken();
  
	constructor(public http: HttpClient, private _platform: Platform, private transfer:FileTransfer) {

		this.headers = new HttpHeaders()
			.set('Content-Type', 'application/json; charset=utf-8')
			.set("cache-control", "no-cache")
			.set("Access-Control-Allow-Origin", "*")
			.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
			.set("Authorization", this.token);

		// if (this._platform.is("cordova")) {
		// 	this.basepath = "http://api.verdejarfranca.com.br/api"
		// }

	}

	getAll() {

		let url: string = this.APIURL + "trees";

		return this.http.get<IArvore[]>(url, { headers: this.headers });
	}

	getConfig() {

		let url: string = this.APIURL + "configs";


		return this.http.get<IConfig>(url, { headers: this.headers });
	}

	get(id:number) {

		let url: string = this.APIURL + "/arvore/"+id;

		return this.http.get<IArvore>(url, { headers: this.headers });
	}

	getEspecieAll() {
		let url: string = this.APIURL + "/species";
		return this.http.get<IEspecie[]>(url, { headers: this.headers });
  }
  
  createArvore(arvore:IArvore){
		this.headers = new HttpHeaders()
			.set('Content-Type', 'application/json; charset=utf-8')
			.set("cache-control", "no-cache")
			.set("Access-Control-Allow-Origin", "*")
			.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
			.set ("Authorization", this.token);

			let url: string = this.APIURL + "/trees";

			return this.http.post<IArvore>(url, arvore, { headers: this.headers});

  }
  
  uploadFoto(id_arvore:number, imagem:string, filename){
		
		const fileTransfer: FileTransferObject = this.transfer.create();
		
		let options: FileUploadOptions = {
			fileKey : 'file',
			fileName: filename,
      headers: {},
      mimeType: "image/jpeg",
      chunkedMode: false
     }
     

		this.headers = new HttpHeaders()
			.set('Content-Type', 'multipart/form-data')
			.set("cache-control", "no-cache")
			.set("Access-Control-Allow-Origin", "*")
			.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
			.set ("Authorization", this.token);

			let url: string = this.APIURL + `/photos/uploadimage?id=${id_arvore}&type=tree`;

      return new Promise(function(resolve,reject){
        fileTransfer.upload(imagem, url, options)
        .then((data) => {
          resolve(data);
        }, (err) => {
          reject(err);
        })
      })

			//return this.http.post<IFoto>(url, options, { headers: this.headers});

	}


	getEspecie( id:number) {

		let url: string = this.APIURL + "/especie/"+id;
		

		return this.http.get<IEspecie>(url, { headers: this.headers });
	}

}
