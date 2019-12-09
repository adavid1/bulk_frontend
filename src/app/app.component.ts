import { Component, Inject } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Manage categories',
      url: '/category',
      icon: 'list'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  username:string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    @Inject(AuthService)
    private authService: AuthService,
    private toastr: ToastrService,
    private route: Router
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
  }

  async logout() {
    this.authService.clearStorage();
    await this.route.navigateByUrl('/');
    window.location.reload();
    this.toastr.success('Successfully logged out', 'Authentification');
  }
}
