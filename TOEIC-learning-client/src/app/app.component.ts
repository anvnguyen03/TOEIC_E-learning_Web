import { Component} from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarHomeComponent } from './navbar-home/navbar-home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, 
            NavbarHomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TOEIC-learning-client';

  constructor(private route: ActivatedRoute,
              private router: Router) { }

}