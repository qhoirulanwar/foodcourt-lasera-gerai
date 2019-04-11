import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { AppProvider } from '../../providers/app/app';

/**
 * Generated class for the GeraiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gerai',
  templateUrl: 'gerai.html',
})
export class GeraiPage {

  dataGerai : any = []

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public appPvdr: AppProvider
    ) {
      this.showGerai()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeraiPage');
  }

  showGerai() {
    this.http.get(this.appPvdr.url+'/admin/gerai')
    .subscribe(
      (res: Response) => {
        console.log(res.json());
        this.dataGerai = res.json()
      },
      (error) => {
        this.appPvdr.networkError();
      }
    )
  };

}
