import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddTestComponent } from './dialog-add-test.component';

describe('DialogAddTestComponent', () => {
  let component: DialogAddTestComponent;
  let fixture: ComponentFixture<DialogAddTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
