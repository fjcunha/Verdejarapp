import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, Modal } from 'ionic-angular';

import { ArvoreProvider } from '../../providers/arvore/arvore';
import { ApiUrlProvider } from '../../providers/api-url/api-url';
import { IArvore } from '../../interfaces/IArvore';

/**
 * Generated class for the GaleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-galery',
  templateUrl: 'galery.html',
})
export class GaleryPage {

   // Variável responsável por guardar a lista de imagens
   images : any[] = [];
   _imgUrl = ApiUrlProvider.GetImageBase();

   public trees:IArvore[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public modal: ModalController,public arvoreProvider:ArvoreProvider) {
    // Lista de imagens criada a partir de um placeholder
    this.arvoreProvider.getAll().subscribe(retorno => {
      this.trees = retorno;
    },error=>{
      console.log(error.error);
      console.log(error.texte);

    });
  }

  openModal(tree:IArvore) {

      const myModal: Modal = this.modal.create('ModalPage', { tree: tree });

      myModal.present();

    }

}
