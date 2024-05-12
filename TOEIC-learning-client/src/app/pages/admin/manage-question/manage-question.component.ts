import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { QuestionService } from '../../../services/test/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TestService } from '../../../services/test/test.service';
import { DialogImportQuestionExcelComponent } from './dialog-import-question-excel/dialog-import-question-excel.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-manage-question',
  standalone: true,
  imports: [RouterLink, DataTablesModule, CommonModule,
    MatButtonModule, MatDialogModule, MatProgressSpinnerModule],
  templateUrl: './manage-question.component.html',
  styleUrl: './manage-question.component.css'
})
export class ManageQuestionComponent implements OnInit{

  dtOptions: Config = {}
  test!: any
  questions: any[] = []

  constructor(private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private snackBar: MatSnackBar,
    private testService: TestService,
    private dialog: MatDialog
  ) {
    
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
    }
    const testId = this.route.snapshot.url[1].path
    this.getTest(testId)
    this.getAllQuestionsFromTest(testId)
  }

  getTest(testId: any) {
    this.testService.getById(testId).subscribe({
      next: (resp) => {
        this.test = resp
      }
    })
  }

  getAllQuestionsFromTest(testId: any) {
    this.questionService.getQuestionsByTestId(testId).subscribe({
      next: (resp: any) => {
        resp.forEach((element: any) => {
          element.image = 'http://localhost:8080/images/' + this.test.testTitle + '/' + element.image
        });
        this.questions = resp
      },
      error: (err) => {
        this.snackBar.open('Lỗi: ' + err.error, 'Đóng', { duration: 3000 })
      }
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogImportQuestionExcelComponent, {
      data: { testId: this.test.id}
    })

    dialogRef.afterClosed().subscribe((result => {
      console.log(`Dialog result: ${result}`)
      if (result == true) {
        this.startLoadingProgress()
      }
    }));
  }

  startLoadingProgress() {
    this.snackBar.open('Import bộ câu hỏi thành công!', 'Đóng', { duration: 5000 })
    .afterDismissed().subscribe(() => {
      this.router.navigate(['/refresh'], { skipLocationChange: true}).then(() => {
        this.router.navigate(['/admindashboard/tests/' + this.test.id + '/questions'])
      })
    })
  }
}
