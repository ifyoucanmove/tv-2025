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
@NgModule({
    declarations: [],
    
    imports: [IonContent,RouterModule,  IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
    exports: [IonContent,RouterModule,  
        IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
})
export class SharedModule {}
