import { GaleryPage } from './../pages/galery/galery';
import { RememberpwsPage } from './../pages/rememberpws/rememberpws';
import { NewtreePage } from './../pages/newtree/newtree';
import { AdminPage } from './../pages/admin/admin';
import { TreePage } from './../pages/tree/tree';
import { InfosPage } from './../pages/infos/infos';
import { MyaccountPage } from './../pages/myaccount/myaccount';
import { NewaccountPage } from './../pages/newaccount/newaccount';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { ApoiadorProvider } from '../providers/apoiador/apoiador';
import { ArvoreProvider } from '../providers/arvore/arvore';
import { StorageProvider } from '../providers/storage/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    NewaccountPage,
    MyaccountPage,
    InfosPage,
    TreePage,
    AdminPage,
    NewtreePage,
    RememberpwsPage,
    GaleryPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(
      //{ name: '__mydbVerdejar'}
    ),
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    NewaccountPage,
    MyaccountPage,
    InfosPage,
    TreePage,
    AdminPage,
    NewtreePage,
    RememberpwsPage,
    GaleryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    UsuarioProvider,
    ApoiadorProvider,
    ArvoreProvider,
    StorageProvider
  ]
})
export class AppModule {}
