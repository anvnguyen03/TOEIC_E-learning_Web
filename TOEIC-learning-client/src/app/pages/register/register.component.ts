import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarHomeComponent } from '../layout/navbar-home/navbar-home.component';
import { FooterHomeComponent } from '../layout/footer-home/footer-home.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NavbarHomeComponent, FooterHomeComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
