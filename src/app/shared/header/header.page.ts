import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class HeaderPage implements OnInit {

  constructor() { }

  ngOnInit() { 
  }

}
