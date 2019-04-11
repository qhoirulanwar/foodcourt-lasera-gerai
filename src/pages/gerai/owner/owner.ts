import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppProvider } from '../../../providers/app/app';
import { Http, Response } from '@angular/http';

/**
 * Generated class for the OwnerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-owner',
  templateUrl: 'owner.html',
})
export class OwnerPage {
  
  dataOwner: any = []

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public appPvdr: AppProvider
    ) {
      this.showOwner()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OwnerPage');
  }

  showOwner() {
    this.http.get(this.appPvdr.url+'/admin/pedagang')
    .subscribe(
      (res: Response) => {
        console.log(res.json());
        this.dataOwner = res.json()
      },
      (error) => {
        this.appPvdr.networkError();
      }
    )
  };

}
