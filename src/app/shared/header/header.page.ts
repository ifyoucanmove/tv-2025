import { Component, input, Input, OnInit } from '@angular/core';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class HeaderPage implements OnInit {
  isCollapsed = input<boolean>(false);
  constructor() {}

  ngOnInit() {}
}
