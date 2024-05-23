import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TestService } from '../../services/test/test.service';

@Component({
  selector: 'app-test-by-category',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './test-by-category.component.html',
  styleUrl: './test-by-category.component.css'
})
export class TestByCategoryComponent {
  isLoggedIn: boolean = false
  listTest: any = [];
  current_page: number = 1;
  total_page: number = 0;
  param_title_url = '';
  cate_name = '';
  
  constructor(private activatedRoute: ActivatedRoute, 
    private testService:TestService,
    private authService:AuthService) {}
  
    ngOnInit(): void {
      let title:string = '';
      let page:number = 1;
      this.cate_name = this.activatedRoute.snapshot.params['catename'];
      this.activatedRoute.queryParams.subscribe(params => {
        title = params['title'] || '';
        page = params['page'] ? +params['page'] : 1;
      });
      this.testService.getAllByCategory(this.cate_name, title, page-1, 5).subscribe({
        next: (response) => {
          console.log(response);
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
  
    getUsername():string {
      return this.authService.getUsername()
    }
  
    getPageRange(totalPage: number): number[] {
      return Array.from({ length: totalPage }, (_, i) => i + 1); // Creates [1, 2, 3, ..., totalPage]
    }

}
