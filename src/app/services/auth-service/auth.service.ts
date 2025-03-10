import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { partUser, role, User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:3000/api/auth";
  status: 'login' | 'register' = 'register';
  constructor(private http: HttpClient) { }
  addUser(details: partUser) {
    return this.http.post<any>(`${this.apiUrl}/${this.status}`, details);
  }
  updateStatus(status: 'login' | 'register') {
    this.status = status;
  }
}
