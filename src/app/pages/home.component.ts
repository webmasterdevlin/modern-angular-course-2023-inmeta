import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  template: `<p>home works!</p>`,
  styles: [],
})
export class HomeComponent {}
