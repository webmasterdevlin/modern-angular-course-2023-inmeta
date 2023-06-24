import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  template: `<p>menu works!</p>`,
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {}
