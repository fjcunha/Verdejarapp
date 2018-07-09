import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GaleryPage } from './galery';

@NgModule({
  declarations: [
    GaleryPage,
  ],
  imports: [
    IonicPageModule.forChild(GaleryPage),
  ],
})
export class GaleryPageModule {}
