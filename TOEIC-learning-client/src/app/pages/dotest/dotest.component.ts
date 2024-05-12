import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TestService } from '../../services/test/test.service';
import { QuestionService } from '../../services/test/question.service';
import { ResourceService } from '../../services/test/resource.service';
import { NavbarHomeComponent } from '../layout/navbar-home/navbar-home.component';
import { FooterHomeComponent } from '../layout/footer-home/footer-home.component';
import { CountdownComponent, CountdownModule, CountdownStatus } from 'ngx-countdown';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dotest',
  standalone: true,
  imports: [NavbarHomeComponent, FooterHomeComponent, CommonModule, RouterLink, CountdownModule,
    ReactiveFormsModule
  ],
  templateUrl: './dotest.component.html',
  styleUrl: './dotest.component.css'
})
export class DotestComponent implements OnInit, AfterViewInit {

  test: any
  questions: any[] = []
  audio: any = null

  part: boolean[] = [true, false, false, false, false, false, false]
  
  submitAnswerForm!: FormGroup

  constructor(private router: Router,
    private route: ActivatedRoute,
    private testService: TestService,
    private questionService: QuestionService,
    private resourceService: ResourceService
  ) {}

  ngAfterViewInit(): void {
  }

  ngOnInit(): any {
    this.getTest()
  }

  getTest() {
    var testId
    this.route.params.subscribe(params => { testId = params['id'] })
    this.testService.getById(testId).subscribe({
      next: (resp) => {
        this.test = resp
        this.questionService.getQuestionsByTestId(this.test.id).subscribe({
          next: (questions) => {
            this.questions = questions
            this.audio = questions[0].audio
            questions.forEach((question: any) => {
              question.image = 'http://localhost:8080/images/' + this.test.testTitle + '/' + question.image
            });
            console.log(questions)
          }
        })
      }
    })
  }

  switchPart(partNum: any) {
    for (let index = 0; index < this.part.length; index++) {
      if (index == partNum - 1) {
        this.part[index] = true
      } else {
        this.part[index] = false
      }
    }
  }

  handleEvent(event: any) {
    if (event.action === 'notify' && event.left === 0 && event.status === 'done') {
      this.submitAnswer();
    }
  }

  submitAnswer() {
    this.router.navigate(['tests/19/results/123123'])
  }
}
