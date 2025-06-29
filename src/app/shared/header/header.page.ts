import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class HeaderPage implements OnInit {
  @Input() isCollapsed: boolean = false;
  constructor() {}

  ngOnInit() {}
}
