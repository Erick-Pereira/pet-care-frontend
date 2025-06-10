import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './features/about/about.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { Etapa1PessoaisComponent } from './features/register/etapas/etapa1Pessoais.component';
import { Etapa2PetComponent } from './features/register/etapas/etapa2Pet.component';
import { SenhaComponent } from './features/register/etapas/etapa3Senha.component';
import { Etapa4ConfirmComponent } from './features/register/etapas/etapa4Confirm.component';
import { PerfilComponent } from './features/perfil/perfil.component';
import { PerfilListComponent } from './features/pet-profile/perfil-list/perfil-list.component';
import { AnimalPublicComponent } from './features/animal-public/animal-public.component';
import { VetHistoryComponent } from './features/vet-history/vet-history.component';
import { AnimalHistoryComponent } from './features/animal-history/animal-history.component';
import { ActivityLogComponent } from './features/activity-log/activity-log.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PetDocumentComponent } from './features/pet-documents/pet-document/pet-document.component';
import { PetPerfilComponent } from './features/pet-perfil/pet-perfil.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VaccinationCardComponent } from './features/vaccination-card/vaccination-card.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    Etapa1PessoaisComponent,
    Etapa2PetComponent,
    SenhaComponent,
    Etapa4ConfirmComponent,
    PerfilComponent,
    PerfilListComponent,
    AnimalPublicComponent,
    VetHistoryComponent,
    AnimalHistoryComponent,
    ActivityLogComponent,
    PetDocumentComponent,
    PetPerfilComponent,
    VaccinationCardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    SharedModule,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
