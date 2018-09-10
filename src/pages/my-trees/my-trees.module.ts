import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyTreesPage } from './my-trees';

@NgModule({
  declarations: [
    MyTreesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyTreesPage),
  ],
})
export class MyTreesPageModule {}
