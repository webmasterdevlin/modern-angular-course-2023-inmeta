import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Actions, State } from '../store';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [SharedModule],
  template: ``,
  styles: [],
})
export class TodosComponent implements OnInit {
  private _stateService = inject(State);
  private _actionsService = inject(Actions);

  store = this._stateService.store;

  async ngOnInit() {
    await this._actionsService.fetchTodos();
  }
}
