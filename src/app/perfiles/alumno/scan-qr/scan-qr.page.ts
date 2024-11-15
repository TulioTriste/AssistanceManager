import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/features/services/user.service';
import { NgxScannerQrcodeService } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {

  public userData: User | undefined;

  constructor(private navCtrl: NavController,
              private scannerService: NgxScannerQrcodeService) {
    this.userData = history.state as User;
  }

  ngOnInit() {
  }

  onQrCodeScanned(data: any) {
    console.log('QR Code scanned:', data);
    // Handle the scanned data (e.g., navigate, display info, etc.)
  }

}
