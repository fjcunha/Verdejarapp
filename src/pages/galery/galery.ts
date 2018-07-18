import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public modal: ModalController) {
    // Lista de imagens criada a partir de um placeholder, você deve substituir aqui pela sua lista que pode vir de um provider
    for (var _i = 10; _i < 60; _i++) {
      this.images.push({
          id: _i,
          image_path: 'https://picsum.photos/100/100?image=' + _i
      })
    }
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad GaleryPage');
  }*/
  openModal(urlImage) {

      const myModalData = {
        descricao: 'descricao da arvore',
        url: urlImage
      };

      const myModal: Modal = this.modal.create('ModalPage', { data: myModalData });

      myModal.present();

      /*myModal.onDidDismiss((data) => {
        console.log("I have dismissed.");
        console.log(data);
      });

      myModal.onWillDismiss((data) => {
        console.log("I'm about to dismiss");
        console.log(data);
      });*/

    }

}
