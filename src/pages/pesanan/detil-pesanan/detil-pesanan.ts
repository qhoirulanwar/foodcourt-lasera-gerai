import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { UserProvider } from '../../../providers/user/user';
import { AppProvider } from '../../../providers/app/app';

/**
 * Generated class for the DetilPesananPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detil-pesanan',
  templateUrl: 'detil-pesanan.html',
})
export class DetilPesananPage {

  headerPesanan:any = {
    area: null,
    date_created: null,
    gerai_id: null,
    gerai_nama: null,
    keterangan: null,
    psn_id: 15386416287171,
    psn_total: null,
    status_id: null,
    status_keterangan: null,
    tempat: null,
    user_id: null,
    waktu: null
  }

  listPesanan: any  = []
  jumlahPesananArray:any = []
  jumlahPesanan: string = null

  showKonfirmPesanan: boolean = true
  konfirmPesananFooter: boolean = true


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public userPvdr: UserProvider,
    public appPvdr: AppProvider,
    public alertCtrl: AlertController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetilPesananPage');

    console.log(this.navParams.get('pesanan_id'));
    
    if (this.navParams.get('pesanan_id') != undefined) {
      this.headerPesanan = this.navParams.get('pesanan_id')
      this.getDetilPesanan()
    }

    if (this.headerPesanan.status_id <= 1) {
      this.konfirmPesananFooter = false
    }

    if (this.headerPesanan.status_id == 3) {
      this.showKonfirmPesanan = false
    }
  }

  getDetilPesanan() {
    this.http.get(this.appPvdr.url+'/pemesanan/'+this.headerPesanan.psn_id+'/order')
    .subscribe(
      (res: Response) => {
        console.log(res.json());
        this.listPesanan = res.json();
        this.headerPesanan.tatalQty = this.listPesanan.length
          
        // mencari total Jumlah menu yang dipesan
        for (var i = 0; i < res.json().length; i++ ) {
          this.jumlahPesananArray.push(res.json()[i].qty)
        }
        // console.log(this.jumlahPesananArray)

        this.jumlahPesanan = this.jumlahPesananArray.reduce(this.getSum)
        console.log(this.jumlahPesanan);
        
      },
      (error) => {
        console.log('error woy');
        this.appPvdr.networkError();
      }
    )
  };

  getSum(total, num) {
    return total + num;
  };

  terimaPesanan() {
    console.log(this.headerPesanan.psn_id);
    const data = {
      psn_id: this.headerPesanan.psn_id,
      status_id: 3,
      user_id: this.headerPesanan.user_id,
      psn_total: this.headerPesanan.psn_total
    }
    this.http.post(this.appPvdr.url+'/gerai/pesanan', data)
    .subscribe(
      (res: Response) => {
        if (res.json().status == true) {
          this.showAlert('Pesanan '+ this.headerPesanan.plgn_nama +' diproses')
          this.showKonfirmPesanan = false
        } else {
          this.showAlert(res.json().message)
          this.konfirmPesananFooter = false
        }
      },
      (error) => {
        console.log('error woy');
        this.appPvdr.networkError();
      }
    )
  }

  tolakPesanan() {
    console.log(this.headerPesanan.psn_id);
    const data = {
      psn_id: this.headerPesanan.psn_id,
      status_id: 0,
      user_id: this.headerPesanan.user_id,
      psn_total: this.headerPesanan.psn_total
    }
    this.http.post(this.appPvdr.url+'/gerai/pesanan', data)
    .subscribe(
      (res: Response) => {
        this.showAlert('Pesanan '+ this.headerPesanan.plgn_nama +' dibatalkan')
        this.konfirmPesananFooter = false
      },
      (error) => {
        console.log('error woy');
        this.appPvdr.networkError();
      }
    )
  }

  selesaiPesanan() {
    const data = {
      psn_id: this.headerPesanan.psn_id,
      status_id: 1,
      user_id: this.headerPesanan.user_id,
      psn_total: this.headerPesanan.psn_total
    }
    
    this.http.post(this.appPvdr.url+'/gerai/pesanan', data)
    .subscribe(
      (res: Response) => {
        this.showAlert('Pesanan '+ this.headerPesanan.plgn_nama +' telah selesai')
        this.konfirmPesananFooter = false
      },
      (error) => {
        console.log('error woy');
        this.appPvdr.networkError();
      }
    )
  }

  showAlert(subTitle: string) {
    const alert = this.alertCtrl.create({
      // title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }
}
