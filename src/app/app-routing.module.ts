import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServicesComponent } from './services/services.component';
import { AboutComponent } from './features/about/about.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { AuthGuard } from './auth.guard';
import { PerfilComponent } from './features/perfil/perfil.component';
import { PerfilListComponent } from './features/pet-profile/perfil-list/perfil-list.component';
import { AnimalPublicComponent } from './features/animal-public/animal-public.component';
import { VetHistoryComponent } from './features/vet-history/vet-history.component';
import { AnimalHistoryComponent } from './features/animal-history/animal-history.component';
import { ActivityLogComponent } from './features/activity-log/activity-log.component';
import { PetDocumentComponent } from './features/pet-documents/pet-document/pet-document.component';
import { VaccinationCardComponent } from './features/vaccination-card/vaccination-card.component';
import { PetPerfilComponent } from './features/pet-perfil/pet-perfil.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'vaccination-card', component: VaccinationCardComponent /*canActivate: [AuthGuard]*/ },
  { path: 'register', component: RegisterComponent },
  { path: 'Perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'PerfilList', component: PerfilListComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'AnimalPublic', component: AnimalPublicComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'VetHistory', component: VetHistoryComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'AnimalHistory', component: AnimalHistoryComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'ActivityLog', component: ActivityLogComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'pet-documents', component: PetDocumentComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'pet-perfil/:id', component: PetPerfilComponent },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
