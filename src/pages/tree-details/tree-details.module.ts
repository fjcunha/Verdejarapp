import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TreeDetailsPage } from './tree-details';

@NgModule({
  declarations: [
    TreeDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TreeDetailsPage),
  ],
})
export class TreeDetailsPageModule {}
