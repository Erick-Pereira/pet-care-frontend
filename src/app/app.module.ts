import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { AboutComponent } from './features/about/about.component';
import { HomeComponent } from './features/home/home.component';
import { ServicesComponent } from './features/services/services.component';
import { LoginComponent } from './features/login/login.component';
import { FormsModule } from '@angular/forms';
import { PetDocumentComponent } from './features/pet-documents/pet-document/pet-document.component';
import { VaccinationCardComponent } from './features/vaccination-card/vaccination-card.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    ServicesComponent,
    LoginComponent,
    PetDocumentComponent,
    VaccinationCardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    ToastrModule.forRoot(),
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
