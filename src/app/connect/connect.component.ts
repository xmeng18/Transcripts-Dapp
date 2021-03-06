import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectService } from '../connect.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {

  constructor(
    private connectService: ConnectService,
    private router: Router,
    private zone: NgZone
  ) { }

  ngOnInit() { }

  connectMobileWallet() {
    this.connectService.connect('MOBILE_WALLET');
    this.zone.run(() => this.router.navigate(['login'])).then();
  }

  connectMetamask() {
    this.connectService.connect('METAMASK');
    this.zone.run(() => this.router.navigate(['login'])).then();
  }

}
