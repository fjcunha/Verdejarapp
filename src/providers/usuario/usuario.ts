import { Platform } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario } from '../../interfaces/IUsuario';
import { Storage } from '@ionic/storage';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  basepath = "/api";
	headers = new HttpHeaders();
	token: string;

  	constructor(public http: HttpClient, private _platform: Platform) {
		

		/*
		* Cria uma tabela dentro do bd do dispositivo
		**/
		this.headers = new HttpHeaders()
			.set("X-CustomHeader", "custom header value")
			.set('Content-Type', 'application/json; charset=utf-8')
			.set("cache-control", "no-cache")
			.set("Access-Control-Allow-Origin", "*")
			.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
			;

		if (this._platform.is("cordova")) {
			this.basepath = "http://mercado8.dlinkddns.com/verdejar/public/api/"
		}
	}

	/*
		envia um formulario com os dados do usuario para cadastro
	*/
	createCustomer(data: IUsuario) {
		console.log("Registrar");
		console.log(data);
		let url: string = this.basepath + "/user/create";

		console.log(url);

		return this.http.post<IUsuario>(url, data, { headers: this.headers });
	}


	loginCustomer(data: IUsuario) {
		let url: string = this.basepath + "/login";
		return this.http.post<IUsuario>(url, data, { headers: this.headers });
	}

	UserData(token: string) {
		this.headers = new HttpHeaders()
			.set("X-CustomHeader", "custom header value")
			.set('Content-Type', 'application/json; charset=utf-8')
			.set("cache-control", "no-cache")
			.set("Access-Control-Allow-Origin", "*")
			.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
			.set('Authorization', 'Bearer ' + token);

		let url: string = this.basepath + "/user";

		return this.http.get<IUsuario>(url,  { headers: this.headers });
  }

  EmailPassword(email:string){
    let url:string = this.basepath + '/password/email';
    this.headers = new HttpHeaders()
			.set('Content-Type', 'application/json; charset=utf-8')
			.set("cache-control", "no-cache")
			.set("Access-Control-Allow-Origin", "*")
      .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      
    return this.http.post(url,{email:email},{ headers: this.headers });
    // return this.http.post<IUsuario>(url,  { headers: this.headers });
  }
  
  // ResetPassword(token:string){
  //   this.headers = new HttpHeaders()
	// 		.set("X-CustomHeader", "custom header value")
	// 		.set('Content-Type', 'application/json; charset=utf-8')
	// 		.set("cache-control", "no-cache")
	// 		.set("Access-Control-Allow-Origin", "*")
	// 		.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	// 		.set('Authorization', 'Bearer ' + token);

	// 	let url: string = this.basepath + "/user";

	// 	return this.http.post<IUsuario>(url,  { headers: this.headers });
  // }

}
