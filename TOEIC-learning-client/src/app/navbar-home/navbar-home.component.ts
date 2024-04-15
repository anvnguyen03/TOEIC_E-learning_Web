import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar-home.component.html',
  styleUrl: './navbar-home.component.css'
})
export class NavbarHomeComponent {

  constructor(private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router) {}

    @ViewChild('dropdownMenu', { static: false })
  dropdownMenu!: ElementRef;

  ngAfterViewInit() {
    // Kiểm tra xem các ViewChild đã được khởi tạo chưa
    console.log(this.dropdownMenu);
  }

  toggleDropdown() {
    if (this.dropdownMenu.nativeElement.classList.contains('show')) {
      this.dropdownMenu.nativeElement.classList.remove('show');
    } else {
      this.dropdownMenu.nativeElement.classList.add('show');
    }
  }
}
