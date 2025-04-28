import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { IonCard,IonButton,IonButtons,IonBackButton,IonIcon, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { IonItem, IonLabel,IonImg, IonList, IonInput } from '@ionic/angular/standalone';

@NgModule({
    declarations: [],

    imports: [IonContent, 
        IonHeader, 
        IonTitle, 
        IonToolbar, 
        IonHeader,
        IonButton,IonButtons,
         IonCol, 
         IonGrid, 
         IonRow,
         IonCard,
         IonCardContent,
         IonCardHeader,
         IonCardSubtitle,
         IonCardTitle,
         IonItem,
         IonLabel,
         IonList,
         IonInput,
         IonBackButton,
         IonIcon,
         IonImg,
        RouterModule, 
        ReactiveFormsModule,
        CommonModule, 
        FormsModule],
    exports: [IonContent, 
        IonHeader, 
        IonTitle, 
        IonToolbar, 
        IonHeader,
        IonButton,IonButtons,
         IonCol, 
         IonGrid, 
         IonRow,
         IonCard,
         IonCardContent,
         IonCardHeader,
         IonCardSubtitle,
         IonCardTitle,
         IonItem,
         IonLabel,
         IonList,
         IonInput,
         IonBackButton,
         IonIcon,
         IonImg,
        RouterModule, 
        ReactiveFormsModule,
        CommonModule, 
        FormsModule],
})
export class SharedModule { }
