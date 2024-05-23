import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, UrlSegment } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TestService } from '../../services/test/test.service';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.css'
})
export class TestsComponent implements OnInit{

  isLoggedIn: boolean = false
  listTest: any = [];
  current_page: number = 1;
  total_page: number = 0;
  param_title_url = '';

  constructor(private activatedRoute: ActivatedRoute, 
    private testService:TestService,
    private authService:AuthService) {}

  ngOnInit(): void {

    console.log('new')

    let title:string = '';
    let page:number = 1;

    const current_url:UrlSegment[] = this.activatedRoute.snapshot.url;

    this.activatedRoute.queryParams.subscribe(params => {
      title = params['title'] || '';
      page = params['page'] ? +params['page'] : 1;
    });
    if(current_url.length == 1) {
      this.getAllTest(title, page-1);
    } else if(current_url.length==2) {
      this.getAllTestByCategory(current_url[1].path, title, page-1);
    }

    this.isLoggedIn = this.authService.isLoggedIn()
  }

  getUsername():string {
    return this.authService.getUsername()
  }

  getPageRange(totalPage: number): number[] {
    return Array.from({ length: totalPage }, (_, i) => i + 1); // Creates [1, 2, 3, ..., totalPage]
  }

  getAllTest(title:string, page:number, size:number=5) {
    this.testService.getAll(title, page, 5).subscribe({
      next: (response) => {
        this.total_page = response[0].totalPages;
        this.listTest = response;
        this.current_page = page;
        if(title != '') {
          this.param_title_url = `title=${title}&`;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getAllTestByCategory(cate_name:string, title:string, page:number) {
    this.testService.getAllByCategory(cate_name, title, page, 5).subscribe({
      next: (response) => {
        this.total_page = response[0].totalPages;
        this.listTest = response;
        this.current_page = page;
        if(title != '') {
          this.param_title_url = `title=${title}&`;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
