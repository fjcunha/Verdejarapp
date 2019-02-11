import { Platform } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario } from '../../interfaces/IUsuario';
import { Storage } from '@ionic/storage';
import { ApiUrlProvider } from '../api-url/api-url';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  APIURL = ApiUrlProvider.GetUrl();
	headers = new HttpHeaders();
	token: string = ApiUrlProvider.GetToken();

  	constructor(public http: HttpClient, private _platform: Platform) {
		

	
		this.headers = new HttpHeaders()
			.set("X-CustomHeader", "custom header value")
			.set('Content-Type', 'application/json; charset=utf-8')
			.set("cache-control", "no-cache")
			.set("Access-Control-Allow-Origin", "*")
      .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
      .set("Authorization",this.token)
			;
	}

	/*
		envia um formulario com os dados do usuario para cadastro
	*/
	createCustomer(data: IUsuario) {
		console.log("Registrar");
		console.log(data);
		let url: string = this.APIURL + "users/";

		console.log(url);

		return this.http.post<any>(url, data, { headers: this.headers });
	}


	loginCustomer(data: IUsuario) {
		let url: string = this.APIURL + "login";
		return this.http.post<any>(url, data, { headers: this.headers });
	}

	UserData(userId: number) {
		this.headers = new HttpHeaders()
			.set("X-CustomHeader", "custom header value")
			.set('Content-Type', 'application/json; charset=utf-8')
			.set("cache-control", "no-cache")
			.set("Access-Control-Allow-Origin", "*")
			.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
			.set('Authorization', this.token);

		let url: string = this.APIURL + "/users/"+userId;

		return this.http.get<IUsuario>(url,  { headers: this.headers });
  }

  EmailPassword(email:string){
    let url:string = this.APIURL + '/users/rememberpassword?email='+email;
    this.headers = new HttpHeaders()
			.set('Content-Type', 'application/json; charset=utf-8')
			.set("cache-control", "no-cache")
			.set("Access-Control-Allow-Origin", "*")
      .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
      .set("Authorization", this.token);
      

    return this.http.get(url,{ headers: this.headers });
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
