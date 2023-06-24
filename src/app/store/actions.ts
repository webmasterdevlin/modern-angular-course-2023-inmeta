import { Injectable, inject } from '@angular/core';
import { State } from './state';
import { HttpService } from '../services/http.service';
import { Post, Todo } from '../models';

@Injectable({
  providedIn: 'root',
})
export class Actions {
  private _stateService = inject(State);
  private _httpService = inject(HttpService);

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
