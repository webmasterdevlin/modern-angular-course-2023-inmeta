import { Injectable, signal } from '@angular/core';
import { Todo } from '../models';

@Injectable({
  providedIn: 'root',
})
export class State {
  store = signal<StoreType>(initialStoreState);
}

export interface StoreType {
  loading: boolean;
  error: string;
  todos: Todo[];
}

const initialStoreState: StoreType = {
  loading: false,
  error: '',
  todos: [],
};
