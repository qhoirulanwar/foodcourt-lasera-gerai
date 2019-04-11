import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { AppProvider } from '../../../providers/app/app';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  dataMenu: any = []

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public appPvdr: AppProvider
    ) {
      this.showMenuGerai()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  showMenuGerai() {
    this.http.get(this.appPvdr.url+'/admin/menu-gerai')
    .subscribe(
      (res: Response) => {
        console.log(res.json());
        this.dataMenu = res.json()
      },
      (error) => {
        this.appPvdr.networkError();
      }
    )
  };
}
