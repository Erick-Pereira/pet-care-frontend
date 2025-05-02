import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HighlightCardComponent } from './components/highlight-card/highlight-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ResourceCardComponent } from './components/resource-card/resource-card.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';

@NgModule({
  declarations: [
    ItemListComponent,
    NavbarComponent,
    FooterComponent,
    ResourceCardComponent,
    HighlightCardComponent,
  ],
  imports: [CommonModule, RouterModule, MatIconModule],
  exports: [
    ItemListComponent,
    NavbarComponent,
    FooterComponent,
    ResourceCardComponent,
    HighlightCardComponent,
    RouterModule,
  ],
})
export class SharedModule {}
