import { Component, inject, OnInit, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,

  imports: [MatSelectModule, ReactiveFormsModule,
    
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule, FormsModule, MatIconModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent  implements OnInit {
status!:string;
router=inject(Router);
user: User | undefined;
authForm!: FormGroup;
  constructor(private userService: AuthService,private fb: FormBuilder) {
     console.log("AuthComponent");
    this.status = this.userService.status;
    console.log(this.status);
  }
  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', Validators.email],
      password: [''],
      name: [''],
      role: [''],
    });
    this.status = this.userService.status;
  }

  submit(){
    if(this.authForm?.valid){
      this.user=this.authForm.value;
    }
    if(this.user){
     // this.userService.updateStatus(this.status==''?'register':'login');
      this.userService.addUser(this.user).subscribe({
        next: (res) => {
          sessionStorage.setItem("token", res.token);
          sessionStorage.setItem("userId", res.userId);
          sessionStorage.setItem("role", this.authForm?.value.role);
     //    this.userService.updateStatus('login'); // עדכון הסטטוס לאחר רישום מוצלח
         this.router.navigate(['/courses']);
        },
        error: (error) => {
          alert("register failed");
          this.authForm?.reset();
        }
      });
    }
  }

//angular-metirial
errorMessage = signal('');

updateErrorMessage() {
  const email=this.authForm.get('email');
  if (email?.hasError('required')) {
    this.errorMessage.set('You must enter a value');
  } else if (email?.hasError('email')) {
    this.errorMessage.set('Not a valid email');
  } else {
    this.errorMessage.set('');
  }
}

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  //angular-metirial
}
