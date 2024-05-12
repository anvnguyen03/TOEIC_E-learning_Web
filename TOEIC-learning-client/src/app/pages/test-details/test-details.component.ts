import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TestService } from '../../services/test/test.service';
import { NavbarHomeComponent } from '../layout/navbar-home/navbar-home.component';
import { FooterHomeComponent } from '../layout/footer-home/footer-home.component';

@Component({
  selector: 'app-test-details',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarHomeComponent, FooterHomeComponent],
  templateUrl: './test-details.component.html',
  styleUrl: './test-details.component.css'
})
export class TestDetailsComponent implements OnInit{

  isTabTestInfo: boolean = true
  isTabSolution: boolean = false

  isTabPractice: boolean = true
  isTabFullTest: boolean = false
  test: any

  constructor(private testService: TestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.getTest()
  }

  getTest() {
    var testId
    this.route.params.subscribe(params => { testId = params['id'] })
    this.testService.getById(testId).subscribe({
      next: (resp) => {
        this.test = resp
      }
    })
  }

  switchTabInfo() {
    this.isTabTestInfo = !this.isTabTestInfo
    this.isTabSolution = !this.isTabSolution
  }

  switchTakeTestTab() {
    this.isTabPractice = !this.isTabPractice
    this.isTabFullTest = !this.isTabFullTest
  }

}
