import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, Modal } from 'ionic-angular';

import { ArvoreProvider } from '../../providers/arvore/arvore';

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
   _imgUrl = "http://mercado8.dlinkddns.com/images/a/";
  constructor(public navCtrl: NavController, public navParams: NavParams,public modal: ModalController,public arvoreProvider:ArvoreProvider) {
    // Lista de imagens criada a partir de um placeholder
    this.arvoreProvider.getAll().subscribe(retorno => {
      for (var i = 0; i < retorno.length; i++) {
        var itens = retorno[i].Photos;
        var urlImagens = this._imgUrl+retorno[i].UserID+'/'+retorno[i].TreeID+'/';

        for (var j = 0; j < itens.length; j++) {
          this.images.push({
              retorno: retorno[i],
              id: itens[j].TreeID,
              image_path: urlImagens+itens[j].Url
          })
          console.log(this.images);
        }
      }

    },error=>{
      console.log(error.error);
      console.log(error.texte);

    });
  }

  openModal(objImg) {

      const myModalData = {
        objImg: objImg,
        url:this._imgUrl
      };

      const myModal: Modal = this.modal.create('ModalPage', { data: myModalData });

      myModal.present();

    }

}
