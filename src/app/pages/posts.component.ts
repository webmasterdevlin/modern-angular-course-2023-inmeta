import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Actions, State } from '../store';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [SharedModule],
  template: `
    <ul>
      <li *ngFor="let post of store().posts.reverse()">
        <h3>{{ post.title }}</h3>
      </li>
    </ul>
  `,
  styles: [],
})
export class PostsComponent implements OnInit {
  private _stateService = inject(State);
  private _actionsService = inject(Actions);
  store = this._stateService.store;

  async ngOnInit() {
    await this._actionsService.fetchPosts();
  }
}
