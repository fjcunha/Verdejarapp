import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation  } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { Facebook } from '@ionic-native/facebook';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Crop } from '@ionic-native/crop';


import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { NewtreePage } from '../pages/newtree/newtree';

//PROVIDERS
import { UsuarioProvider } from '../providers/usuario/usuario';
import { ApoiadorProvider } from '../providers/apoiador/apoiador';
import { ArvoreProvider } from '../providers/arvore/arvore';
import { StorageProvider } from '../providers/storage/storage';
import { ImagePicker } from '@ionic-native/image-picker';
import { ApiUrlProvider } from '../providers/api-url/api-url';
import { AndroidPermissions } from '@ionic-native/android-permissions';

//importando pagina de nova senha
@NgModule({
  declarations: [
    MyApp
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    ApoiadorProvider,
    ArvoreProvider,
    StorageProvider,
    Camera,
    Geolocation,
    ImagePicker,
    Facebook,
    FileTransfer,
    ApiUrlProvider,
    AndroidPermissions,
    Diagnostic,
    Crop
  ]
})
export class AppModule {}
