import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonsService } from '../../../services/lessons-service/lessons.service';
@Component({
  selector: 'app-add-lesson-form',
  standalone: true,
  imports: [MatSelectModule, MatRadioModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './add-lesson-form.component.html',
  styleUrl: './add-lesson-form.component.css'
})
export class AddLessonFormComponent implements OnInit {
  lessonForm!: FormGroup;
  courseId = 0;

  constructor(private route: ActivatedRoute, private coursesService: LessonsService, private fb: FormBuilder, private router: Router) {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  addLesson() {
    if (this.lessonForm.valid) {
      this.coursesService.addLesson(this.courseId, this.lessonForm.value).subscribe({
        next: res => {
          this.router.navigate([`/courses/${this.courseId}/lessons`]);
        },
        error: err => console.error('Error:', err)
      });
    }
  }

  ngOnInit(): void {
    this.courseId = parseInt(this.route.snapshot.paramMap.get('id') ?? '0', 10);
  }
}

