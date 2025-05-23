import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './features/about/about.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register/register.component';
import { DadosPessoaisComponent } from './features/register/dados-pessoais/dados-pessoais.component';
import { DadosPetComponent } from './features/register/dados-pet/dados-pet.component';
import { SenhaComponent } from './features/register/senha/senha.component';
import { PerfilComponent } from './features/perfil/perfil.component';
import { PerfilListComponent } from './features/pet-profile/perfil-list/perfil-list.component';
import { AnimalPublicComponent } from './features/animal-public/animal-public.component';
import { VetHistoryComponent } from './features/vet-history/vet-history.component';
import { AnimalHistoryComponent } from './features/animal-history/animal-history.component';
import { ActivityLogComponent } from './features/activity-log/activity-log.component';
import { PetDocumentComponent } from './features/pet-documents/pet-document/pet-document.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'DadosPessoais', component: DadosPessoaisComponent },
  { path: 'DadosPet', component: DadosPetComponent },
  { path: 'Senha', component: SenhaComponent },
  { path: 'Perfil', component: PerfilComponent },
  { path: 'PerfilList', component: PerfilListComponent },
  { path: 'AnimalPublic', component: AnimalPublicComponent },
  { path: 'VetHistory', component: VetHistoryComponent },
  { path: 'AnimalHistory', component: AnimalHistoryComponent },
  { path: 'ActivityLog', component: ActivityLogComponent },
  { path: 'pet-documents', component: PetDocumentComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
