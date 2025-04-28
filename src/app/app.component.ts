import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp,
    IonRouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
})
export class AppComponent implements OnInit {
  constructor(public router: Router) {}

  async ngOnInit() {
    this.initializeBackButtonHandler();
  }

  initializeBackButtonHandler() {
    document.addEventListener('ionBackButton',async (ev:any) => {
    const currentUrl = this.router.url;

       if(currentUrl.includes('preview')){
        //this.router.navigate(['/challenges'])
      }
     
      else if(currentUrl.includes('home')){
        return
      }
      else{
        console.log("back historys")
        window.history.back();
      }
     
    });
  } 
}
