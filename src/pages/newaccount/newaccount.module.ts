import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewaccountPage } from './newaccount';

@NgModule({
  declarations: [
    NewaccountPage,
  ],
  imports: [
    IonicPageModule.forChild(NewaccountPage),
  ],
})
export class NewaccountPageModule {}
