import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTaskWeightComponent } from './assign-task-weight.component';

describe('AssignTaskWeightComponent', () => {
  let component: AssignTaskWeightComponent;
  let fixture: ComponentFixture<AssignTaskWeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTaskWeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTaskWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
