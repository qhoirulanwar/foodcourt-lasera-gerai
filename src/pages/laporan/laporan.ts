import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { UserProvider } from '../../providers/user/user';
import { AppProvider } from '../../providers/app/app';

/**
 * Generated class for the LaporanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-laporan',
  templateUrl: 'laporan.html',
})
export class LaporanPage {

  dataLaporan:any = []

  jumlahHargaArray = []
  totalHarga: any = 0
  d = new Date();
  tanggal = this.d.getDate() + '-' + this.d.getMonth() + '-' + this.d.getFullYear()

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public userPvdr: UserProvider,
    public appPvdr: AppProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LaporanPage');
    setTimeout(() => {
      this.getDataLaporan()
    }, 500);
  }

  getDataLaporan() {
    this.http.get(this.appPvdr.url+'/gerai/laporan/'+this.userPvdr.dataUser.gerai_id)
    .subscribe(
      (res: Response) => {
        console.log(res.json());
        
        if (res.json().length == 0) {
          console.log('data kosong');
          
        } else {
          this.dataLaporan = res.json()
          // mencari total Jumlah harga
          for (var i = 0; i < res.json().length; i++ ) {
            this.jumlahHargaArray.push(res.json()[i].jumlah)
          }
          
          this.totalHarga = this.jumlahHargaArray.reduce(this.getSum)
          console.log(this.totalHarga);
        }
        
      },
      (error) => {
        this.appPvdr.networkError();
      }
    )
  }

  
  getSum(total, num) {
    return total + num;
  };

}
