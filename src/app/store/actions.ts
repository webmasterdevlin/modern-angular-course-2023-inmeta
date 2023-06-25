import { Injectable, inject, effect } from '@angular/core';
import { State } from './state';
import { HttpService } from '../services/http.service';
import { Post, Todo } from '../models';
import { LocalStorageService } from '../utilities/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class Actions {
  private key = 'store';
  private _stateService = inject(State);
  private _httpService = inject(HttpService);
  private _localStorageService = inject(LocalStorageService);

  constructor() {
    // the effect can only be used inside a constructor
    effect(() =>
      this._localStorageService.setItem(this.key, this._stateService.store())
    );
  }

  // with side effect because this is with asynchronous call
  async fetchTodos() {
    this.enableLoading();
    try {
      const { data } = await this._httpService.get<Todo[]>('todos');
      this._stateService.store.mutate((store) => (store.todos = data));
    } catch (e: any) {
      this.setError(e.message);
    }
    this.disableLoading();
  }

  async fetchPosts() {
    this.enableLoading();
    try {
      const { data } = await this._httpService.get<Post[]>('posts');
      this._stateService.store.mutate((store) => (store.posts = data));
    } catch (e: any) {
      this.setError(e.message);
    }
    this.disableLoading();
  }

  // with no side effect, synchronous
  removeTodoById(index: number) {
    this._stateService.store.mutate((state) => state.todos.splice(index, 1));
  }

  async createPost(value: Post) {
    this.enableLoading();
    try {
      const { data } = await this._httpService.post<Post>('posts', value);
      this._stateService.store.mutate((store) => store.posts.push(data));
    } catch (e: any) {
      this.setError(e.message);
    }
    this.disableLoading();
  }

  private enableLoading() {
    this._stateService.store.mutate((store) => {
      store.loading = true;
      store.error = '';
    });
  }

  private setError(message: string) {
    this._stateService.store.mutate((store) => (store.error = message));
  }

  private disableLoading() {
    this._stateService.store.mutate((store) => (store.loading = false));
  }
}
