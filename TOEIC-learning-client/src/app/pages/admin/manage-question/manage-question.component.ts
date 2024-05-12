import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { QuestionService } from '../../../services/test/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TestService } from '../../../services/test/test.service';

@Component({
  selector: 'app-manage-question',
  standalone: true,
  imports: [RouterLink, DataTablesModule, CommonModule,
    MatButtonModule, MatDialogModule],
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
    private testService: TestService
  ) {
    this.dtOptions = {
      pagingType: 'full_numbers',
    }
  }

  ngOnInit(): void {
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
      next: (resp) => {
        this.questions = resp
      },
      error: (err) => {
        this.snackBar.open('Lỗi: ' + err.error, 'Đóng', { duration: 3000 })
      }
    })
  }

}
