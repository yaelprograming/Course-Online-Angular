import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../../../models/course';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { CoursesService } from '../../../../services/courses-service/courses.service';

@Component({
  selector: 'app-update-course-form',
  standalone: true,
  imports: [MatSelectModule, MatRadioModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './update-course-form.component.html',
  styleUrls: ['./update-course-form.component.css']
})
export class UpdateCourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  private courseId = 0;
  routerNavigate = inject(Router);
  course!: Course;

  constructor(private http:HttpClient, private route: ActivatedRoute, private coursesService: CoursesService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.courseId = parseInt(this.route.snapshot.paramMap.get('id')?.toString() ?? '');
    
    this.courseForm = this.fb.group({
      title: [''], 
      description: [''],
      teacherId: ['']
    });
    this.coursesService.getCourseById(this.courseId).subscribe(res => {
      this.course = res;
      this.courseForm.patchValue({
        title: this.course.title,
        description: this.course.description,
        teacherId: this.course.teacherId
      });
    });
  }
  
  updateCourse() {
    if (this.courseForm.valid) {
      const updatedCourse: Course = {
        id: this.courseId,
        title: this.courseForm.get('title')?.value,
        description: this.courseForm.get('description')?.value,
        teacherId: this.courseForm.get('teacherId')?.value,
      };

      this.coursesService.updateCourse(updatedCourse).subscribe({
        next: () => {
          this.routerNavigate.navigate(['courses']);
        }
      });
    }
  }

}
