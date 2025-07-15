import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-trainer-details',
  templateUrl: './trainer-details.page.html',
  styleUrls: ['./trainer-details.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class TrainerDetailsPage implements OnInit {

  data:any;
  constructor(  public router: Router) { 
         const navigation = this.router.getCurrentNavigation();
         console.log(navigation,"navigation");
  if (navigation?.extras.state) {
    const data:any = navigation.extras.state;
    this.data = data.data;
    console.log(data,"ss"); 
  }
  }

  ngOnInit() {
  }

}
