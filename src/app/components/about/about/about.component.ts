import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,      // מספק ngIf, ngFor ושאר דברים בסיסיים
    MatCardModule,     // מאפשר שימוש ב-MatCard
    MatGridListModule, // מאפשר שימוש ב-MatGridList
    MatIconModule      // מאפשר שימוש ב-MatIcon
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  features = [
    { title: 'Expert-Led Courses', icon: 'school', description: 'Learn from industry leaders and professionals.' },
    { title: 'Flexible Learning', icon: 'schedule', description: 'Study at your own pace, anytime, anywhere.' },
    { title: 'Interactive Content', icon: 'smart_display', description: 'Engage with videos, quizzes, and assignments.' },
  ];
}
