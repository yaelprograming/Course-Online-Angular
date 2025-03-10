import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { LessonsService } from '../../../services/lessons-service/lessons.service';
import { Lesson } from '../../../models/Lesson';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [MatCardModule, MatToolbarModule, MatTabsModule, MatButtonModule, MatToolbar, MatMenuModule, RouterModule, MatIconModule, CommonModule, MatListModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatExpansionModule],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class EditCourseComponent implements OnInit {
  lessons: Lesson[] = [];
  courseId = "";

  isTeacher = (sessionStorage.getItem("role") == "teacher" || sessionStorage.getItem("role") == "admin");

  constructor(private route: ActivatedRoute, private lessonsService: LessonsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('id') ?? '';
      if (this.courseId != '') {
        this.lessonsService.getLessons(+this.courseId); 
        this.lessonsService.lessons$.subscribe(lessons => {
          this.lessons = lessons;
        });
      }
    });
  }

  deleteLesson(id: number): void {
    this.lessonsService.deleteLesson(+this.courseId, id).subscribe();
  }
}

