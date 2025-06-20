import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterFeatureRoutingModule } from '../register-feature-routing.module';
// import { DadosPetComponent } from '../views/tabs/dados-pet/dados-pet.component';
// Importe outros componentes do fluxo de registro conforme necessário

@NgModule({
  declarations: [
    // DadosPetComponent removido para evitar declaração duplicada
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    RegisterFeatureRoutingModule,
  ],
})
export class RegisterFeatureModule {}
