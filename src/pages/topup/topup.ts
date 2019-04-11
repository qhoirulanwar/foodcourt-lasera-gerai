import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { AppProvider } from '../../providers/app/app';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the TopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-topup',
  templateUrl: 'topup.html',
})
export class TopupPage {

  idPelanggan: string
  validPelanggan: boolean = false
  dataPelanggan: any = {
    plgn_nama : null
  }
  nominal : number = null

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public http: Http,
    public appPvdr: AppProvider,
    public userPvdr: UserProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopupPage');
  }

  cekPelanggan() {
    const prompt = this.alertCtrl.create({
      title: 'Cek No Telp Pelanggan',
      message: "Masukkan No Telp Pelanggan",
      inputs: [
        {
          name: 'idPelanggan',
          placeholder: 'ID Reseller',
          value: this.idPelanggan
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Cek',
          handler: data => {
            console.log('Cek clicked');
            this.idPelanggan = data.idPelanggan
            this.postCekPelanggan(this.idPelanggan)
          }
        }
      ]
    });
    prompt.present();
  };

  trxTopup() {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    })
    
    if (this.validPelanggan == true) {

      if (this.nominal >= 1) {
        const alert = this.alertCtrl.create({
          title: `Topup ${formatter.format(this.nominal)}`,
          subTitle: 'Konfirmasi pengisian saldo kepada <b>' + this.dataPelanggan.plgn_nama + '</b>',
          buttons: [
            {
              text: 'Batal',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'OK',
              handler: data => {
                console.log('OKE clicked');
                console.log(this.dataPelanggan);
                
                this.http.post(this.appPvdr.url+'/admin/topup', {
                  seluler: this.dataPelanggan.plgn_telp,
                  topup: Number(this.nominal)
                })
                .subscribe(
                  (res: Response) => {
                    console.log(res.json());
                    
                    if (res.json().status == true) {
                      const alert = this.alertCtrl.create({
                        // title: 'New Friend!',
                        subTitle: res.json().message ,
                        buttons: [
                          {
                            text: 'OK',
                            handler: data => {
                              this.dataPelanggan = {
                                plgn_nama : null
                              }
                              this.idPelanggan = null
                              this.nominal = null
                            }
                          }
                        ]
                      });
                      alert.present();
                    }
                  },
                  (error) => {
                    this.appPvdr.networkError();
                  }
                )
              }
            }
          ]
        });
        alert.present();
        
      } else {
        const alert = this.alertCtrl.create({
          // title: '',
          subTitle: 'Harap isi Nominal Topup',
          buttons: ['OK']
        });
        alert.present();
      }

    } else {
      const alert = this.alertCtrl.create({
        // title: '',
        subTitle: 'Harap isi No Seluler Pelanggan',
        buttons: ['OK']
      });
      alert.present();
    }
  };

  postCekPelanggan(idPelanggan) {
    this.http.post(this.appPvdr.url+'/admin/topup/cek', {telp: idPelanggan})
    .subscribe(
      (res:Response)=>{
        console.log(res.json());
        if (res.json().status == false) {
          // console.log(res.json().message);
          const alert = this.alertCtrl.create({
            // title: 'New Friend!',
            subTitle: res.json().message,
            buttons: ['OK']
          });
          alert.present();

        } else {
          this.dataPelanggan = res.json()
          this.validPelanggan = true
        }
      },
      (error)=>{
        // this.validReseller = false
        console.log(error);
      }
    )
  };

}
