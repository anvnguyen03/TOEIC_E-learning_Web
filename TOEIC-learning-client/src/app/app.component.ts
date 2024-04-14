import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TOEIC-learning-client';

  constructor(private renderer: Renderer2) { }

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