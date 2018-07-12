import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


/**
 * Generated class for the RememberpwsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rememberpws',
  templateUrl: 'rememberpws.html',
})
export class RememberpwsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
  }
  //função loading botão
  presentLoading() {

    this.loadingCtrl.create({

      content: 'Please wait...',

      duration: 3000,

      dismissOnPageChange: true

    }).present();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RememberpwsPage');
  }

}
