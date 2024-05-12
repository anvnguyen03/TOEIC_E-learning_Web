import { Component } from '@angular/core';
import { NavbarHomeComponent } from '../layout/navbar-home/navbar-home.component';
import { FooterHomeComponent } from '../layout/footer-home/footer-home.component';

@Component({
  selector: 'app-test-result',
  standalone: true,
  imports: [NavbarHomeComponent, FooterHomeComponent],
  templateUrl: './test-result.component.html',
  styleUrl: './test-result.component.css'
})
export class TestResultComponent {

}
