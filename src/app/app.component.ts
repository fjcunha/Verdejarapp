import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageProvider } from '../providers/storage/storage';
import { IUsuario } from '../interfaces/IUsuario';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'TabsPage';

  pagesAuth: Array<{title: string, component: any, icon: string}>;
  pagesNotAuth: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private storageProvider:StorageProvider,
    public menuCtrl: MenuController) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pagesNotAuth = [
      { title: 'Home', component: 'TabsPage', icon: 'home' },
      { title: 'Login', component: 'LoginPage', icon: 'person' },
      { title: 'Mapa', component: 'MapsPage', icon: 'map' },
    ];

    this.pagesAuth = [
      { title: 'Home', component: 'TabsPage', icon: 'home' },
      { title: 'Minha Conta', component: 'MyaccountPage',  icon: 'person' },
      { title: 'Minhas Arvores', component: 'MyTreesPage',  icon: 'leaf' },
      { title: 'Mapa', component: 'MapsPage' , icon: 'pin'} ,
      { title: 'Sair', component: 'Sair', icon: 'exit' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.loadUserInit();
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
