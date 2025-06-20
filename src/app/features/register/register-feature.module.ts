import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterFeatureRoutingModule } from './register-feature-routing.module';
import { RegisterComponent } from './views/register.component';
import { DadosPessoaisComponent } from './views/tabs/dados-pessoais/dados-pessoais.component';
import { DadosPetComponent } from './views/tabs/dados-pet/dados-pet.component';
import { SenhaComponent } from './views/tabs/senha/senha.component';
import { ConfirmacaoComponent } from './views/tabs/confirmacao/confirmacao.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    RegisterComponent,
    DadosPessoaisComponent,
    DadosPetComponent,
    SenhaComponent,
    ConfirmacaoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    RegisterFeatureRoutingModule,
    HttpClientModule,
  ],
})
export class RegisterFeatureModule {}
