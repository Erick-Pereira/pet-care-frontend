import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';

import { AboutComponent } from './features/about/about.component';
import { HomeComponent } from './features/home/home.component';
import { ServicesComponent } from './features/services/services.component';
import { LoginComponent } from './features/login/login.component';

import { RegisterComponent } from './features/register/register.component';
import { Etapa1PessoaisComponent } from './features/register/etapas/etapa1Pessoais.component';
import { Etapa2PetComponent } from './features/register/etapas/etapa2Pet.component';
import { SenhaComponent } from './features/register/etapas/etapa3Senha.component';
import { Etapa4ConfirmComponent } from './features/register/etapas/etapa4Confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    ServicesComponent,
    LoginComponent,
    RegisterComponent,
    Etapa1PessoaisComponent,
    Etapa2PetComponent,
    SenhaComponent,
    Etapa4ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ToastrModule.forRoot(),
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
