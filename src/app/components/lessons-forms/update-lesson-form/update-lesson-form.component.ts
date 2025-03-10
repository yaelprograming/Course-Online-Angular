import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonsService } from '../../../services/lessons-service/lessons.service';
import { Lesson } from '../../../models/Lesson';
@Component({
  selector: 'app-update-lesson-form',
  standalone: true,
  imports: [MatSelectModule, MatRadioModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './update-lesson-form.component.html',
  styleUrl: './update-lesson-form.component.css'
})
export class UpdateLessonFormComponent implements OnInit {
  lessonForm!: FormGroup;
  routerNavigate = inject(Router);
  lesson!:Lesson;
  courseId = 0
  lessonId = 0;
  constructor(private route: ActivatedRoute, private lessonsService: LessonsService, private fb: FormBuilder) {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }
  updateLesson() {
    if (this.lessonForm.valid) {
        this.lessonsService.updateLesson(this.courseId, this.lessonId, this.lessonForm.value).subscribe({
            next: res => {
                this.routerNavigate.navigate([`/courses/${this.courseId}/lessons`]);
            },
            error: err => console.error('Error:', err)
        });
    }
}


  ngOnInit(): void {
    this.courseId = parseInt(this.route.snapshot.paramMap.get('id')?.toString() ?? '');
    this.lessonId=parseInt(this.route.snapshot.paramMap.get('lessonId')?.toString() ?? '');
    this.lessonsService.getLessonById(this.courseId,this.lessonId).subscribe(res => {
      this.lesson = res;
      this.lessonForm = this.fb.group({
        title: [this.lesson.title, Validators.required],
        content: [this.lesson.content, Validators.required]
      });
    });
  }


}


