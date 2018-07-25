import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { IUsuario } from '../../interfaces/IUsuario';


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
  cadastro : any = {};
  newuser: IUsuario = {};
 
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, public formBuilder:FormBuilder) {
    this.cadastro = this.formBuilder.group({
      nome:['',Validators.required],
      sobrenome:['',Validators.required],
      email:['',Validators.email],
      ddd:['',Validators.compose([Validators.maxLength(2)])],
      telefone:['',Validators.compose([Validators.minLength(9)])],
      senha1:['',Validators.compose([Validators.minLength(6)])],
      senha2:['',Validators.compose([Validators.minLength(6)])],
      termosContrato:['',Validators.requiredTrue],

    });
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Termos do Contrato',
      message: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker'+
      'Ao contrário do que se acredita, Lorem Ipsum não é simplesmente um texto randômico. Com mais de 2000 anos, suas raízes podem ser encontradas em uma obra de literatura latina clássica datada de 45 AC. Richard McClintock, um professor de latim do Hampden-Sydney College na Virginia, pesquisou uma das mais obscuras palavras em latim, consectetur, oriunda de uma passagem de Lorem Ipsum, e, procurando por entre citações da palavra na literatura clássica, descobriu a sua indubitável origem. Lorem Ipsum vem das seções 1.10.32 e 1.10.33 do "de Finibus Bonorum et Malorum" (Os Extremos do Bem e do Mal), de Cícero, escrito em 45 AC. Este livro é um tratado de teoria da ética muito popular na época da Renascença. A primeira linha de Lorem Ipsum, "Lorem Ipsum dolor sit amet..." vem de uma linha na seção 1.10.32.',
      buttons: ['OK']
      
    });
    alert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewaccountPage');
  }

  Register(){
    // this.newuser.name = this.cadastro.
  }
  
}
