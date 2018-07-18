import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  const data = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get('data');


    console.log(this.data);
  }

  ionViewDidLoad() {
  }
    /*closeModal() {
        const data = {
            name: 'John Doe',
            occupation: 'Milkman'
        };
        this.view.dismiss(data);
    }*/
}
