import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserTodosComponent } from './user-todos/user-todos.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'users/:userId/todos', component: UserTodosComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
