import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImportQuestionExcelComponent } from './dialog-import-question-excel.component';

describe('DialogImportQuestionExcelComponent', () => {
  let component: DialogImportQuestionExcelComponent;
  let fixture: ComponentFixture<DialogImportQuestionExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogImportQuestionExcelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogImportQuestionExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
