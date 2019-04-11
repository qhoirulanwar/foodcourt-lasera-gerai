import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, MenuController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SideNavPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-side-nav',
  templateUrl: 'side-nav.html',
})
export class SideNavPage {

  @ViewChild(Nav) nav: Nav;

  homePage: string = 'PesananPage'

  admin_nama: string = null
  admin_id: string = null
  gerai: string = null
  
  constructor(
    public menuCtrl: MenuController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage : Storage,
    public userPvdr: UserProvider
    ) {
      setTimeout(() => {
        this.admin_nama = userPvdr.dataUser.nama
        this.admin_id = userPvdr.dataUser.pemilik_email
        this.gerai = userPvdr.dataUser.gerai_nama
      }, 500);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SideNavPage');
  }

  openPageRoot(page: string) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  };

  openPage(page: string, statusPsn: string) {
    this.nav.setRoot(page, {"status_pesanan": statusPsn});
    this.menuCtrl.close();
  };

  logout() {
    this.storage.remove('userLaseraGerai')
    // this.storage.remove('listOrder')
    this.navCtrl.setRoot('LoginPage')
  };

}
