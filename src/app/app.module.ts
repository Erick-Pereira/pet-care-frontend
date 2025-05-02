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
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DadosPessoaisComponent } from './features/register/dados-pessoais/dados-pessoais.component';
import { DadosPetComponent } from './features/register/dados-pet/dados-pet.component';
import { SenhaComponent } from './features/register/senha/senha.component';
import { ConfirmacaoComponent } from './features/register/confirmacao/confirmacao.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DadosPessoaisComponent,
    DadosPetComponent,
    SenhaComponent,
    ConfirmacaoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ToastrModule.forRoot(),
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
