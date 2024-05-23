import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountSettingsComponent } from './my-account-settings.component';

describe('MyAccountSettingsComponent', () => {
  let component: MyAccountSettingsComponent;
  let fixture: ComponentFixture<MyAccountSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAccountSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyAccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
