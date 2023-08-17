import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: String = 'Minhas Tarefas';
  public todos: Todo[] = [];
  public form: FormGroup;
  public mode: String = 'list';

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      description: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required,
        ])
      ]
    });

    this.load();
  }

  changeMode(mode: String) {
    this.mode = mode;
  }

  add() {
    const description = this.form.controls['description'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, description, false));
    this.save();
    this.clear();
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index != -1) this.todos.splice(index, 1);
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  load() {
    const data = localStorage.getItem('todos');
    if (data) {
      this.todos = JSON.parse(data as string);
    } else this.todos = [];
  }
}
