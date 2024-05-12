import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminTestService } from '../../../../services/admin/admin-test.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminQuestionService } from '../../../../services/admin/admin-question.service';

@Component({
  selector: 'app-dialog-import-question-excel',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatInputModule,
    MatFormFieldModule, ReactiveFormsModule, MatDividerModule],
  templateUrl: './dialog-import-question-excel.component.html',
  styleUrl: './dialog-import-question-excel.component.css'
})
export class DialogImportQuestionExcelComponent implements OnInit{
  
  fileQuestions?: File | null
  filesImages?: File[] | null
  fileAudio?: File | null
  testId: any

  constructor(
    private formBuilder: FormBuilder,
    private adminQuestionService: AdminQuestionService,
    private snackBar: MatSnackBar,
    private router: Router,
    // public dialogRef: MatDialogRef<DialogImportQuestionExcelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
  }

  ngOnInit(): void {
    this.testId = this.data.testId
  }

  onFileExcelSelected(event: any) {
    const file = event.target.files[0]
    if (file) {
      this.fileQuestions = file
    } else {
      this.fileQuestions = null
    }

  }
  onFileImageSelected(event: any) {
    const files = event.target.files
    if (files) {
      this.filesImages = files
    } else {
      this.filesImages = null
    }
  }

  onFileAudioSelected(event: any) {
    const file = event.target.files[0]
    if (file) {
      this.fileAudio = file
    } else {
      this.fileAudio = null
    }
  }

  submit() {
    this.uploadExcelQuestions()
    this.uploadImages()
    this.uploadAudio()
  }

  uploadExcelQuestions() {
    const excelForm: FormData = new FormData()
    excelForm.append('file', this.fileQuestions!)
    excelForm.append('testId', this.testId)
    this.adminQuestionService.uploadExcelQuesions(excelForm).subscribe({
      next: (resp) => {
        console.log(resp)
      },
      error: (err) => {
        console.log(err.error)
      }
    })
  }

  uploadImages() {
    const imagesForm: FormData = new FormData()
    for (const file of this.filesImages!) {
      imagesForm.append('image', file)
    }
    imagesForm.append('testId', this.testId)
    this.adminQuestionService.uploadImages(imagesForm).subscribe({
      next: (resp) => {
        console.log(resp)
      },
      error: (err) => {
        console.log(err.error)
      }
    })
  }

  uploadAudio() {
    const audioForm: FormData = new FormData()
    audioForm.append('audio', this.fileAudio!)
    audioForm.append('testId', this.testId)
    this.adminQuestionService.uploadAudio(audioForm).subscribe({
      next: (resp) => {
        console.log(resp)
      },
      error: (err) => {
        console.log(err.error)
      }
    })
  }

}
