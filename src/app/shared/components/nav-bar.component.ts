import { Component, inject } from '@angular/core';
import { State } from 'src/app/store';
import { Router } from '@angular/router';
import { SharedModule } from '../shared.module';
import { MenuComponent } from './menu.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [SharedModule, MenuComponent],
  template: `
    <nav>
      <app-menu label="home" (handleClick)="to('/')" />
      <app-menu
        label="todos"
        [counter]="store().todos.length"
        (handleClick)="to('todos')"
      />
      <app-menu
        label="posts"
        [counter]="store().posts.length"
        (handleClick)="to('posts')"
      />
    </nav>
  `,
  styles: [],
})
export class NavBarComponent {
  stateService = inject(State);
  store = this.stateService.store;
  private _router = inject(Router);

  async to(url: string) {
    await this._router.navigateByUrl(url);
  }
}
