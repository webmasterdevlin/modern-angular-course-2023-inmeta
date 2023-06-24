import { Injectable, inject } from '@angular/core';
import { State } from './state';
import { HttpService } from '../services/http.service';
import { Todo } from '../models';

@Injectable({
  providedIn: 'root',
})
export class Actions {
  private _stateService = inject(State);
  private _httpService = inject(HttpService);

  // with side effect because this is with asynchronous call
  async fetchTodos() {
    this._stateService.store.mutate((store) => {
      store.loading = true;
      store.error = '';
    });
    try {
      const { data } = await this._httpService.get<Todo[]>('todos');
      this._stateService.store.mutate((store) => (store.todos = data));
    } catch (e: any) {
      this._stateService.store.mutate((store) => (store.error = e.message));
    }
    this._stateService.store.mutate((store) => (store.loading = false));
  }
}
