import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Actions, State } from '../store';
import { FormBuilder, Validators } from '@angular/forms';
import { combineLatestWith, debounceTime, distinctUntilChanged } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Post } from '../models';

@UntilDestroy()
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [SharedModule],
  template: `
    <form [formGroup]="postForm" (ngSubmit)="handleSubmitPost()">
      <label for="title">Title</label>
      <input
        type="text"
        id="title"
        formControlName="title"
        class="bg-gray-50 border border-gray-300 rounded-lg"
      />
      <label for="body">Body</label>
      <input
        type="text"
        id="body"
        formControlName="body"
        class="bg-gray-50 border border-gray-300 rounded-lg"
      />
      <button type="submit" class="text-white bg-indigo-700 rounded-xl p-1">
        Submit
      </button>
    </form>
    <h3 class="my-100 text-indigo-900">{{ content }}</h3>
    <ul>
      <li *ngFor="let post of store().posts.reverse()">
        <h3>{{ post.title }}</h3>
      </li>
    </ul>
  `,
  styles: [],
})
export class PostsComponent implements OnInit {
  content = '';
  private _stateService = inject(State);
  private _actionsService = inject(Actions);
  private _formBuilder = inject(FormBuilder);
  store = this._stateService.store;

  postForm = this._formBuilder.group({
    userId: [0],
    title: ['', [Validators.required]],
    body: ['', [Validators.required]],
  });

  async ngOnInit() {
    await this._actionsService.fetchPosts();
    this.watchForm();
  }

  async handleSubmitPost() {
    this.postForm.value.userId = 1;
    await this._actionsService.createPost(this.postForm.value as Post);
    this.postForm.reset();
  }

  private watchForm() {
    const bodyValueChanges = this.postForm.get('body')?.valueChanges;

    if (bodyValueChanges) {
      this.postForm
        .get('title')
        ?.valueChanges.pipe(
          debounceTime(1000),
          distinctUntilChanged(),
          combineLatestWith(bodyValueChanges),
          untilDestroyed(this)
        )
        .subscribe(([title, body]) => {
          if (title && body) this.content = `${title}: ${body}`;
          else this.content = '';
        });
    }
  }
}
