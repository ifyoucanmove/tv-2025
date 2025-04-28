import { Component, Input } from '@angular/core';
import { QrCodeModule } from 'ng-qrcode';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [QrCodeModule],
  template: `
    <ng-qrcode
      [value]="value"
      [size]="size"
      [level]="level"
      [margin]="margin"
      [colorDark]="colorDark"
      [colorLight]="colorLight"
    ></ng-qrcode>
  `
})
export class QrCodeComponent {
  @Input() value: string = '';
  @Input() size: number = 200;
  @Input() level: 'L' | 'M' | 'Q' | 'H' = 'M';
  @Input() margin: number = 4;
  @Input() colorDark: string = '#000000';
  @Input() colorLight: string = '#ffffff';
} 