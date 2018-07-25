import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NewtreePage } from '../pages/newtree/newtree';
import { StorageProvider } from '../providers/storage/storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'TabsPage';

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private storageProvider:StorageProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'TabsPage' },
      { title: 'Login', component: 'LoginPage' },
      { title: 'Minha Conta', component: 'MyaccountPage' },
      { title: 'Mapa', component: 'MapsPage' },
      { title: 'Adminstração', component: 'AdminPage' },
      { title: 'Sair', component: 'LoginPage' },     
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title == 'Sair') this.logout();
    else this.nav.setRoot(page.component);
  }

  logout(){
    this.storageProvider.SetStorage('VerdejarUser',null);
    this.nav.setRoot('LoginPage');
  }
}
