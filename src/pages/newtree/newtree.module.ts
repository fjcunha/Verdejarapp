import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewtreePage } from './newtree';

@NgModule({
  declarations: [
    NewtreePage,
  ],
  imports: [
    IonicPageModule.forChild(NewtreePage),
  ],
})
export class NewtreePageModule {}
