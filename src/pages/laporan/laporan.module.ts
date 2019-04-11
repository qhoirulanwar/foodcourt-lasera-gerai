import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LaporanPage } from './laporan';

@NgModule({
  declarations: [
    LaporanPage,
  ],
  imports: [
    IonicPageModule.forChild(LaporanPage),
  ],
})
export class LaporanPageModule {}
