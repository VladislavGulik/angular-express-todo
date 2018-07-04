import { Component } from '@angular/core';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  title: string = '';

  constructor(private todoService: TodoService){

  }

  onSubmit = () => {
    this.todoService.createTodo(this.title);
  }
}
