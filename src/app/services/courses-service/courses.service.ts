import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Course } from '../../models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = "http://localhost:3000/api/courses";
  private coursesSubject: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  public courses$: Observable<Course[]> = this.coursesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getCourses();
  }

  private getCourses(): void {
    this.http.get<Course[]>(this.apiUrl).subscribe(
      (courses) => {
        this.coursesSubject.next(courses);
      }
    );;
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).pipe(tap(() => this.getCourses()));
  }
  getCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${courseId}`);
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(tap(() => this.getCourses()));
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(tap(() => {
      this.getCourses();
    }));
  }
}
