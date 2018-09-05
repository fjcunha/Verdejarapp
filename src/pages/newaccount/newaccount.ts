import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { IUsuario } from '../../interfaces/IUsuario';
import { StorageProvider } from '../../providers/storage/storage';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

/**
 * Generated class for the NewaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newaccount',
  templateUrl: 'newaccount.html',
})

export class NewaccountPage {
  //cadastro : any = {};
  _customer: IUsuario = {
		email: '',
		password: '',
		token: '',
		picture:''
  };
  
  confirmPassword:string = "";
  _termos:boolean = false;
  verifyPass : boolean = false;
  loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public formBuilder:FormBuilder
    ,public menuCtrl: MenuController, public toastController: ToastController,
    public storageProvider: StorageProvider, public loadingCtrl: LoadingController,
    public customerProvider : UsuarioProvider) {
    /*this.cadastro = this.formBuilder.group({
      nome:['',Validators.required],
      sobrenome:['',Validators.required],
      email:['',Validators.email],
      ddd:['',Validators.compose([Validators.maxLength(2)])],
      telefone:['',Validators.compose([Validators.minLength(9)])],
      senha1:['',Validators.compose([Validators.minLength(6)])],
      senha2:['',Validators.compose([Validators.minLength(6)])],
      termosContrato:['',Validators.requiredTrue],

    });*/
  }

  showAlert(pMessage:string,pTitle:string) {
    const alert = this.alertCtrl.create({
      title: pTitle,
      message: pMessage,
      buttons: ['OK']
      
    });
    alert.present();
  }

  ionViewDidLoad() {
    this.logout();
  }

  register() {    

    console.log("register");
    if(this._termos && this.verifyPass ){
      this._customer.active = 1;
      this._customer.admin = 0;
      this.presentLoading();
      // this.customerProvider.createCustomer(this._customer).subscribe(res => {

      //   console.log("dentro do provider");
      //     this._customer = res;
      //     console.log(res);
      //     if(res){
      //       console.log("Registrado");
      //       this.storageProvider.SetStorage('VerdejarUser', this._customer);
      //       this.menuCtrl.enable(true, 'Auth');
      //       this.menuCtrl.enable(false, 'NotAuth');
      //       this.dismissLoading();
      //       this.navCtrl.setRoot(HomePage);
      //     }  
      //     else{

      //       this.dismissLoading();
      //     }

      //   },
      //     erro => {
      //       this.dismissLoading();
      //       console.log(erro.message);
      //       console.log(erro);
      //       this.presentToast(erro.message, 'middle');
      //   }
      // )
    }
    else{
     alert('Aceite os termos');
    }
}

  logout(){
    this.storageProvider.GetStorage('VerdejarUser').then(val => {
      if(val) {
        this.presentLoading();
        this.storageProvider.SetStorage('VerdejarUser', null);
        this.menuCtrl.enable(false, 'Auth');
        this.menuCtrl.enable(true, 'NotAuth');
        this.dismissLoading();
        this.navCtrl.setRoot(LoginPage);
      }	
    })
  }


  public confirm(){
    
    console.log("Senha: " + this._customer.password + " - Confirm: "+ this.confirmPassword);

    if(this._customer.password == this.confirmPassword){
      
      if(this._customer.password.length < 5){
        this.showAlert("A senha deve conterno mínimo 5 dígitos!","Senha incompatível");
        return this.verifyPass = false;
      }

       return this.verifyPass = true;
    }
    else{
      
      this.showAlert("A senha não conferem!","Senha incompatível");
      return this.verifyPass = false;
    }
  }
  
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

  Termos(){

    if(this._termos == false){
      this._termos = true;
    }

    console.log(this._termos);
    if(!this._termos){
      this.showAlert("Você deve aceitar os termos de uso!",'Aceite os termos de uso');
    }

    console.log(this._termos);
  }


  showTermos(){
    let termos:string;
    
    this.storageProvider.GetStorage('VerdejarConfigs').then(res =>{
      termos =res.termos;

      this.showAlert(termos,"Termos de uso");
    });

  }

}
