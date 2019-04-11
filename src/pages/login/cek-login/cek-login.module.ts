import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CekLoginPage } from './cek-login';

@NgModule({
  declarations: [
    CekLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(CekLoginPage),
  ],
})
export class CekLoginPageModule {}
