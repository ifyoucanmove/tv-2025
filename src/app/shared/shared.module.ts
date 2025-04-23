import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPage } from './header/header.page';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { IonCard,IonButton, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';


@NgModule({
    declarations: [],

    imports: [IonContent, 
        IonHeader, 
        IonTitle, 
        IonToolbar, 
        IonHeader,
        IonButton,
         IonCol, 
         IonGrid, 
         IonRow,
         IonCard,
         IonCardContent,
         IonCardHeader,
         IonCardSubtitle,
         IonCardTitle,
        RouterModule, 
        CommonModule, 
        FormsModule],
    exports: [IonContent, 
        IonHeader, 
        IonTitle, 
        IonToolbar, 
        IonHeader,
        IonButton,
         IonCol, 
         IonGrid, 
         IonRow,
         IonCard,
         IonCardContent,
         IonCardHeader,
         IonCardSubtitle,
         IonCardTitle,
        RouterModule, 
        CommonModule, 
        FormsModule],
})
export class SharedModule { }
