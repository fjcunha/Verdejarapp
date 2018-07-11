import { Platform } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario } from '../../interfaces/IUsuario';
import { Storage } from '@ionic/storage';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(public http: HttpClient, private storage: Storage) {
    
  }

  //cria o storage local
	SetStorage(key, value) {
		this.storage.set(key, value); //seta o nome e valor
		return this.storage;
	}

	//busca o storage local
	GetStorage(key) {
		return this.storage.get(key);
	}


}
