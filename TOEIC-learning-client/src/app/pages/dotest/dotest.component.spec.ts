import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotestComponent } from './dotest.component';

describe('DotestComponent', () => {
  let component: DotestComponent;
  let fixture: ComponentFixture<DotestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DotestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DotestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
