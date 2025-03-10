import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLessonFormComponent } from './update-lesson-form.component';

describe('UpdateLessonFormComponent', () => {
  let component: UpdateLessonFormComponent;
  let fixture: ComponentFixture<UpdateLessonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLessonFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLessonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
