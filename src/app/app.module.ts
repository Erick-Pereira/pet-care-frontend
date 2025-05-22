import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './features/about/about.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register/register.component';
import { DadosPessoaisComponent } from './features/register/dados-pessoais/dados-pessoais.component';
import { DadosPetComponent } from './features/register/dados-pet/dados-pet.component';
import { SenhaComponent } from './features/register/senha/senha.component';
import { ConfirmacaoComponent } from './features/register/confirmacao/confirmacao.component';
import { PerfilComponent } from './features/perfil/perfil.component';
import { PerfilListComponent } from './features/pet-profile/perfil-list/perfil-list.component';
import { AnimalPublicComponent } from './features/animal-public/animal-public.component';
import { VetHistoryComponent } from './features/vet-history/vet-history.component';
import { AnimalHistoryComponent } from './features/animal-history/animal-history.component';
import { ActivityLogComponent } from './features/activity-log/activity-log.component';
import { SharedModule } from "./shared/shared.module";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    ConfirmacaoComponent,
    PerfilComponent,
    PerfilListComponent,
    AnimalPublicComponent,
    VetHistoryComponent,
    AnimalHistoryComponent,
    ActivityLogComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    SharedModule,
    CommonModule,
    FormsModule
],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
