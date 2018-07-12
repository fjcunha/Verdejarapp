import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RememberpwsPage } from '../rememberpws/rememberpws';
import { NewaccountPage } from '../newaccount/newaccount';
import { MyaccountPage } from '../myaccount/myaccount';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  rememberpwsPage = RememberpwsPage
  newaccountPage = NewaccountPage
  myaccountPage = MyaccountPage
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
//funçaõ Loading

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
