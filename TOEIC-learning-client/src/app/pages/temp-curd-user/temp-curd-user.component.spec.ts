import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempCurdUserComponent } from './temp-curd-user.component';

describe('TempCurdUserComponent', () => {
  let component: TempCurdUserComponent;
  let fixture: ComponentFixture<TempCurdUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempCurdUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TempCurdUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
