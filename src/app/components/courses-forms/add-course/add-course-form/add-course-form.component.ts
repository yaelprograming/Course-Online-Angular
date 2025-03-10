
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CoursesService } from '../../../../services/courses-service/courses.service';

@Component({
  selector: 'app-add-course-form',
  standalone: true,
  imports: [MatSelectModule, MatRadioModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.css']
})
export class AddCourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  routerNavigate = inject(Router);
  userId = 0;

  constructor(private route: ActivatedRoute, private coursesService: CoursesService, private fb: FormBuilder, private http: HttpClient) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  addCourse() {
    if (this.courseForm.valid) {
      this.coursesService.addCourse(this.courseForm.value).subscribe({
        next: res => {
          this.courseForm.reset();
          this.routerNavigate.navigate(['courses']);
        } });
    }
  }
  

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id')?.toString() ?? '');
  }
}
