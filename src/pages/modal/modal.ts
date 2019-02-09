import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IArvore } from '../../interfaces/IArvore';
import { ApiUrlProvider } from '../../providers/api-url/api-url';

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

  tree:IArvore = {};
  _imgUrl = ApiUrlProvider.GetImageBase();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tree = this.navParams.get('tree');
    console.log(this.tree);
  }

  ionViewDidLoad() {
  }
}
