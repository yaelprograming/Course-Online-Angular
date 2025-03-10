import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../../models/course';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JoinLeaveCoursesService {
  private apiUrl = "http://localhost:3000/api/courses";
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();

  constructor(private http: HttpClient) { }
 
  joinCourse(userId: number, courseId: number): void {
    this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId })
      .subscribe(() => {
        this.getCoursesById(userId).subscribe(courses => {
          this.coursesSubject.next(courses);
        });
      });
  }
  
  leaveCourse(userId: number, courseId: number): void {
    this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, { body: { userId } })
      .subscribe(() => {
        this.getCoursesById(userId).subscribe(courses => {
          this.coursesSubject.next(courses);
        });
      });
  }
  

  getCoursesById(userId: number): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl + "/student/" + userId).pipe(
      tap(courses => this.coursesSubject.next(courses))
    );
  }

}
