// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppProvider {

  url:string = 'http://localhost:3000'

  constructor(
    // public http: HttpClient,
    public alertCtrl: AlertController
    ) {
    console.log('Hello AppProvider Provider');
  }

  networkError() {
    let alert = this.alertCtrl.create({
      title: 'Koneksi Gagal',
      subTitle: 'Pastikan koneksi internet terhubung',
      // buttons: ['Dismiss']
    })
    alert.present()
  }

}
