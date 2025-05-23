import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './features/about/about.component';
import { HomeComponent } from './features/home/home.component';
import { ServicesComponent } from './features/services/services.component';
import { LoginComponent } from './features/login/login.component';
import { PetDocumentComponent } from './features/pet-documents/pet-document/pet-document.component';
import { VaccinationCardComponent } from './features/vaccination-card/vaccination-card.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pet-documents', component: PetDocumentComponent },
  { path: 'vaccination-card', component: VaccinationCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
