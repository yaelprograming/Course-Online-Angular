import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JoinLeaveCoursesService } from '../../services/join-leave-courses-service/join-leave-courses.service';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { EditCourseComponent } from '../course-details/course-details/course-details.component';
import { CoursesService } from '../../services/courses-service/courses.service';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [MatCardModule, MatToolbarModule, MatTabsModule, MatButtonModule, MatToolbar, MatMenuModule, RouterModule, MatIconModule, CommonModule, MatListModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatCardModule, RouterModule, CommonModule, ReactiveFormsModule, EditCourseComponent],
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  isTeacher = (sessionStorage.getItem("role") == "teacher" || sessionStorage.getItem("role") == "admin") ? true : false;
  userId = sessionStorage.getItem("userId");
  listCourses: Course[] = [];
  showAddForm = false;
  showUpdateForm = false;
  courseForm!: FormGroup;
  joinedCourses: Course[] = [];

  constructor(private joinLeave: JoinLeaveCoursesService, private coursesService: CoursesService, private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.coursesService.courses$.subscribe(courses => {
      this.listCourses = courses;
    });
    if (this.userId) {
      this.joinLeave.getCoursesById(parseInt(this.userId)).subscribe(courses => {
        this.joinedCourses = courses;
      });
    }
    this.joinLeave.courses$.subscribe(courses => {
      this.joinedCourses = courses;
    });
  }

  deleteCourse(id: number) {
    this.coursesService.deleteCourse(id).subscribe();
  }

  isJoin(course: Course) {
    return this.joinedCourses.find(c => c.id === course.id) !== undefined;
  }

  join(course: Course) {
    this.joinLeave.joinCourse(parseInt(this.userId ?? ""), course.id);
  }

  leave(course: Course) {
    this.joinLeave.leaveCourse(parseInt(this.userId ?? ""), course.id);
  }
}