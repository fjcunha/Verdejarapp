import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IArvore } from '../../interfaces/IArvore';
import { IEspecie } from '../../interfaces/IEspecie';
import { IFoto } from '../../interfaces/IFotos';
import { IConfig } from '../../interfaces/IConfig';
import {Observable} from 'rxjs/Observable'
import { Storage } from '@ionic/storage';

/*
  Generated class for the ArvoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArvoreProvider {

  basepath = "/api";

	headers = new HttpHeaders();
	token: string;
	constructor(public http: HttpClient, private _platform: Platform) {

		this.headers = new HttpHeaders()
			.set('Content-Type', 'application/json; charset=utf-8')
			.set("cache-control", "no-cache")
			.set("Access-Control-Allow-Origin", "*")
			.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

		if (this._platform.is("cordova")) {
			this.basepath = "http://api.verdejarfranca.com.br/api/"
		}

	}

	getAll() {

		let url: string = this.basepath + "/arvore";

		return this.http.get<IArvore[]>(url, { headers: this.headers });
	}

	getConfig() {

		let url: string = this.basepath + "/config";


		return this.http.get<IConfig>(url, { headers: this.headers });
	}

	get(id:number) {

		let url: string = this.basepath + "/arvore/"+id;

		return this.http.get<IArvore>(url, { headers: this.headers });
	}

	getEspecieAll() {

		let url: string = this.basepath + "/especie";

		

		return this.http.get<IEspecie[]>(url, { headers: this.headers });
	}


	getEspecie( id:number) {

		let url: string = this.basepath + "/especie/"+id;
		

		return this.http.get<IEspecie>(url, { headers: this.headers });
	}

}
