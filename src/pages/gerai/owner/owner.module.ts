import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnerPage } from './owner';

@NgModule({
  declarations: [
    OwnerPage,
  ],
  imports: [
    IonicPageModule.forChild(OwnerPage),
  ],
})
export class OwnerPageModule {}
