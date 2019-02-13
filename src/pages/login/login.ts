import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { NewaccountPage } from '../newaccount/newaccount';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { StorageProvider } from '../../providers/storage/storage';
import { IUsuario } from '../../interfaces/IUsuario';
import { Facebook } from '@ionic-native/facebook';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	user: IUsuario = {
		Email: '',
		Password: ''
	};

	tmpToken = [];
	
	loading;
	
	constructor(public navCtrl: NavController, public navParams: NavParams,
		public menuCtrl: MenuController, public customerProvider: UsuarioProvider, 
		public storageProvider: StorageProvider, public toastController: ToastController,
        public loadingCtrl: LoadingController, private alertCtrl: AlertController, public facebook: Facebook
		) {
			// this.storageProvider.GetStorage('VerdejarUser').then(val => {
			// 	if(val) {
			// 		this.presentLoading();
			// 		this.storageProvider.SetStorage('VerdejarUser', null);
			// 		this.menuCtrl.enable(false, 'auth');
			// 		this.menuCtrl.enable(true, 'unauth');
			// 		this.dismissLoading();
			// 		this.navCtrl.setRoot(LoginPage);
			// 	}	
			// })
	}

  ionViewDidLoad() {
    this.menuCtrl.swipeEnable(false);
	}

	registerLink(param) {
		this.navCtrl.push('NewaccountPage', { param });
	}

	login() {		
    if(!(this.user.Email != null && this.user.Email != '' &&
      this.user.Password != null && this.user.Password != ''))
    {
      let alert = this.alertCtrl.create({
        title:'Dados inválidos',
        subTitle:'Preencha os campos corretamente para entrar',
        buttons:['Ok']
      });
    
      alert.present();
      return;
    }

      //requisita o login na API
    this.presentLoading();
    this.customerProvider.loginCustomer(this.user).subscribe(res => {
        
        console.log(res);

        //retorno TRUE
      if(res.status == 'success'){
        this.user = res.user;
        this.storageProvider.SetStorage('VerdejarUser', this.user);
				this.menuCtrl.enable(true, 'Auth');
        this.menuCtrl.enable(false, 'NotAuth');
				//this.dismissLoading();
				this.navCtrl.setRoot('TabsPage');
        //busca os dados do usuario dentro da API
        //this.GetUserData(this.user.UserID);	
        
      }
      else
      {
        let alert = this.alertCtrl.create({
          title:'Dados inválidos',
          subTitle:'Email ou senha incorreta.',
          buttons:['Ok']
        });
        
        alert.present();
      }

      this.dismissLoading();
    },
      erro => {
        console.log(JSON.stringify(erro));
        this.dismissLoading();
        console.log(erro.text);
        this.presentToast(erro.error, 'middle');
    })

	}


//método para chamar api do facebook e salvar no banco o usuario    
// loginFacebook() {
//      let permissions = new Array<string>();
//      permissions = ["public_profile", "email"];

//      this.facebook.login(permissions).then((response) => {
//       let params = new Array<string>();

//       this.facebook.api("/me?fields=name,email", params)
//       .then(res => {

//           //estou usando o model para criar os usuarios
          
//           this._customer.name = res.name;
//           this.user.Email = res.email;
//           this.user.Password = res.id;
//           this._customer.phone = "00000000";
//           this._customer.admin = 0;
        
//           this.loginfromfacebook();
//         }, (error) => {
//           alert(error);
//           console.log('ERRO LOGIN: ',error);
//         })
//       }, (error) => {
//         alert(error);
//       });
//     }


	// loginfromfacebook() {		
		   
	//     	//requisita o login na API
	// 		this.presentLoading();
	// 		// this.customerProvider.loginCustomerFacebook(this._customer).subscribe(res => {
	      	
	//     //   	console.log(res);

	//     //   	//retorno TRUE
	//     //   if(res != null){
	//     //     this._customer = res;
	//     //     //busca os dados do usuario dentro da API
	//     //     this.GetUserData(this._customer.token);	
	        
	//     //   }
	//     //   else
	//     //   {
	//     //     let alert = this.alertCtrl.create({
	//     //       title:'Dados inválidos',
	//     //       subTitle:'Email ou senha incorreta.',
	//     //       buttons:['Ok']
	//     //     });
	        
	//     //     alert.present();
	//     //   }

	//     //   this.dismissLoading();
	//     // },
	//     //   erro => {
	//     //     this.dismissLoading();
	//     //     console.log(erro.text);
	//     //     this.presentToast(erro.error, 'middle');
	//     // })

	// }


	// GetUserData(token:string){
	// 	this.customerProvider.UserData(token).subscribe(retorno => {
	// 			//Salva os dados dentro do banco de dados
	// 			this._customer = retorno;
	// 			this._customer.token = token;
	// 			this.storageProvider.SetStorage('VerdejarUser', this._customer);
	// 			this.menuCtrl.enable(true, 'auth');
	// 			this.menuCtrl.enable(false, 'unauth');
	// 			//this.dismissLoading();
	// 			this.navCtrl.setRoot('TabsPage');
	// 		}
	// 		,
	// 		erro => {
	// 			//this.dismissLoading();
	// 			this.presentToast(erro.error, 'middle');
	// 		}
		
	// 	);
	// }

	presentToast(msg: string, pPosition: string) {
		let toast = this.toastController.create({
			message: msg,
			duration: 3000,
			position: pPosition
		});
		toast.present();
	}
	
	presentLoading() {
		if(!this.loading){
			this.loading = this.loadingCtrl.create();
			this.loading.present();
		}
	}

	dismissLoading(){
		if(this.loading){
			this.loading.dismiss();
			this.loading = null;
		}
	}
}
