import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SideNavPage } from './side-nav';

@NgModule({
  declarations: [
    SideNavPage,
  ],
  imports: [
    IonicPageModule.forChild(SideNavPage),
  ],
})
export class SideNavPageModule {}
