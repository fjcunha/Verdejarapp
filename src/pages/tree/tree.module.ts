import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TreePage } from './tree';

@NgModule({
  declarations: [
    TreePage,
  ],
  imports: [
    IonicPageModule.forChild(TreePage),
  ],
})
export class TreePageModule {}
