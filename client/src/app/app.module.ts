import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoService } from './shared/todo.service';

import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { LoginFormComponent } from './auth/login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoFormComponent,
    TodoListComponent,
    TodoItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AuthModule
  ],
  providers: [
    TodoService,
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
