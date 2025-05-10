import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './features/about/about.component';
import { HomeComponent } from './features/home/home.component';
import { ServicesComponent } from './features/register/services/services.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register/register.component';
import { DadosPessoaisComponent } from './features/register/dados-pessoais/dados-pessoais.component';
import { DadosPetComponent } from './features/register/dados-pet/dados-pet.component';
import { PerfilComponent } from './features/perfil/perfil.component';
import { PerfilListComponent } from './features/perfil-list/perfil-list.component';
import { PerfilCardComponent } from './features/perfil-card/perfil-card.component';
import { PerfilCreateComponent} from './features/perfil-create/perfil-create.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent },
  { path: 'DadosPessoais', component: DadosPessoaisComponent },
  { path: 'DadosPet', component: DadosPetComponent },
  { path: 'Perfil', component: PerfilComponent},
  { path: 'PerfilList', component: PerfilListComponent },
  { path: 'PerfilCard', component: PerfilCardComponent },
  { path: 'PerfilCreate', component: PerfilCreateComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
