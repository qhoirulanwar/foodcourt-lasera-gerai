import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  // selector: 'page-cek-login',
  template: ``
})
export class CekLoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.cekUserLogin()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CekLoginPage');
  }

  cekUserLogin(){
    this.storage.get('userLaseraGerai').then((resp) => {
      if(resp == null){
        this.navCtrl.setRoot('LoginPage');
      } else {
        this.navCtrl.setRoot('SideNavPage');
      }
    })
  }

}
