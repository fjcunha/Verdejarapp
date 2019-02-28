import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { IArvore } from '../../interfaces/IArvore';
import { ArvoreProvider } from '../../providers/arvore/arvore';
import { ApiUrlProvider } from '../../providers/api-url/api-url';

/**
 * Generated class for the TreeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tree-details',
  templateUrl: 'tree-details.html',
})
export class TreeDetailsPage {
  public tree:IArvore = {};
  public _imgUrl = ApiUrlProvider.GetImageBase();

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private arvoreProvider:ArvoreProvider,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    this.tree.TreeID = this.navParams.get('treeId');
    this.LoadTreeDetails();
  }

  LoadTreeDetails(){
    let loading = this.loadingCtrl.create();
    loading.present();
    this.arvoreProvider.get(this.tree.TreeID).subscribe(res=>{
      loading.dismiss();
      console.log(res);
      this.tree = res;
    },err=>{
      loading.dismiss();
      console.log(err);
      this.alertCtrl.create({title:'Falha de Comunicação',
                            subTitle:'Falha ao comunicar com o servidor.',
                            buttons:[
                                      { text:'OK',
                                        handler:()=>{
                                          this.navCtrl.setRoot('MyTreesPage'); 
                                        }
                                      },
                                    ]
                            }).present();
    })
  }

}
