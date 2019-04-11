import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { UserProvider } from '../../providers/user/user';
import { AppProvider } from '../../providers/app/app';

/**
 * Generated class for the PesananPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pesanan',
  templateUrl: 'pesanan.html',
})
export class PesananPage {

  idGerai : string
  dataPesanan: any = []

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http,
    public userPvdr: UserProvider,
    public appPvdr: AppProvider
    ) {
      setTimeout(() => {
        this.idGerai = this.userPvdr.dataUser.gerai_id
        console.log(this.idGerai);
        this.getPesananGerai()
      }, 500);
      
      setInterval(() => {
        this.idGerai = this.userPvdr.dataUser.gerai_id
        console.log(this.idGerai);
        this.getPesananGerai()
      }, 3000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PesananPage');
  }

  getPesananGerai() {
    this.http.get(this.appPvdr.url+'/gerai/pesanan/'+this.idGerai)
    .subscribe(
      (res: Response) => {

        console.log(res.json());
        this.dataPesanan = res.json()
      },
      (error) => {
        this.appPvdr.networkError();
      }
    )
  };

  detilTrx(index: any) {
    console.log(this.dataPesanan[index]);
    
    this.navCtrl.push('DetilPesananPage', {"pesanan_id":this.dataPesanan[index]})
    // this.navCtrl.push('DetilTransaksiPage')
  }

}
