import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestByCategoryComponent } from './test-by-category.component';

describe('TestByCategoryComponent', () => {
  let component: TestByCategoryComponent;
  let fixture: ComponentFixture<TestByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestByCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
