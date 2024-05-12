import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { TestCategoryService } from '../../../../services/test/test-category.service';
import { AdminTestService } from '../../../../services/admin/admin-test.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-add-test',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatInputModule,
     MatFormFieldModule, ReactiveFormsModule,MatSelectModule],
  templateUrl: './dialog-add-test.component.html',
  styleUrl: './dialog-add-test.component.css'
})
export class DialogAddTestComponent implements OnInit{

  testCategories: any[] = []
  addTestForm!: FormGroup

  constructor(private testCateService: TestCategoryService,
    private formBuilder: FormBuilder,
    private adminService: AdminTestService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.getAllTestCategory()

    this.addTestForm = this.formBuilder.group({
      testTitle: ['', Validators.required],
      categoryId: ['', Validators.required]
    })
  }

  getAllTestCategory() {
    this.testCateService.getAll().subscribe({
      next: (resp) => {
        this.testCategories = resp
      }
    })
  }

  addTest() {
    this.adminService.createTest(this.addTestForm.value).subscribe({
      next: (resp) => {
        this.snackBar.open('Thêm đề thi mới thành công', 'Đóng', { duration: 3000 })
        .afterDismissed()
        .subscribe(() => {
          this.router.navigate(['/refresh'], {skipLocationChange: true}).then(() => {
            this.router.navigate(['/admindashboard'])
          })
        })
      },
      error: (err) => {
        this.snackBar.open('Lỗi: ' + err.error, 'Đóng', { duration: 3000 })
      }
    })
  }
}
