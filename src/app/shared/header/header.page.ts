import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
  standalone: true,
  imports: [IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HeaderPage implements OnInit {
  @Input() isCollapsed: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
