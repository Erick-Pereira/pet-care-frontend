import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';

import { FooterComponent } from './components/footer/footer.component';
import { HighlightCardComponent } from './components/highlight-card/highlight-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ResourceCardComponent } from './components/resource-card/resource-card.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ButtonComponent, ButtonComponent as ExternalButtonComponent } from './components/button/button-register.component';

@Component({
  selector: 'app-button-register',
  template: '<button>Register</button>',
})
export class LocalButtonComponent {}

@NgModule({
  declarations: [
    ItemListComponent,
    NavbarComponent,
    FooterComponent,
    ResourceCardComponent,
    HighlightCardComponent,
    ExternalButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  exports: [
    ItemListComponent,
    NavbarComponent,
    FooterComponent,
    ResourceCardComponent,
    HighlightCardComponent,
    ButtonComponent,
    RouterModule
  ]
})
export class SharedModule {}
