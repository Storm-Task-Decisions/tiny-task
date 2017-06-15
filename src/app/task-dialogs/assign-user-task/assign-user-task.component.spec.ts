import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignUserTaskComponent } from './assign-user-task.component';

describe('AssignUserTaskComponent', () => {
  let component: AssignUserTaskComponent;
  let fixture: ComponentFixture<AssignUserTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignUserTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignUserTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
