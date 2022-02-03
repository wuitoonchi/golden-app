import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public pages : any[] = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Wallet', url: '/wallet', icon: 'wallet' },
    { title: 'Referral', url: '/referrals', icon: 'people' },
    { title: 'Logout', url: '/logout', icon: 'log-out', route: true },
  ];
  constructor(
    private navController: NavController
  ) {}

  singOut() {
    this.navController.navigateRoot('/welcome');
  }
}
