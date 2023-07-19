import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeesonPlanCalenderComponent } from './leeson-plan-calender.component';

describe('LeesonPlanCalenderComponent', () => {
  let component: LeesonPlanCalenderComponent;
  let fixture: ComponentFixture<LeesonPlanCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeesonPlanCalenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeesonPlanCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
