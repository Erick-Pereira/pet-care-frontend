import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button-register.component.html',
  styleUrls: ['./button-register.component.scss']
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() rota!: string;

  constructor(private router: Router) {}

navegar() {
    this.router.navigate([this.rota]);
  }
}
