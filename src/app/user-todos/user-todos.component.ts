import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user-todos',
  templateUrl: './user-todos.component.html',
  styleUrls: ['./user-todos.component.css']
})
export class UserTodosComponent implements OnInit {
  todos: any
  completedTodos: any[] = []
  uncompletedTodos: any[] = []
  showCompleted = true
  selectedCategory: string | null = null
  newTodoTitle = ''
  newTodoDescription = ''
  newTodoCategory = ''

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId')
    if (userId) {
      this.dataService.getUserTodos(userId).subscribe(data => {
        this.todos = data;
        this.completedTodos = this.todos.filter((todo: any) => todo.completed);
        this.uncompletedTodos = this.todos.filter((todo: any) => !todo.completed);
      });
    } else {
      this.router.navigate(['/users'])
    }
  }

  addTodo(): void {
    const newTodo = {
      todoId: Math.random().toString(36).substr(2, 9),
      userId: this.route.snapshot.paramMap.get('userId'),
      title: this.newTodoTitle,
      description: this.newTodoDescription,
      category: this.newTodoCategory,
      completed: false
    };
    this.todos.push(newTodo)
    this.uncompletedTodos.push(newTodo);
    this.newTodoTitle = ''
    this.newTodoDescription = ''
    this.newTodoCategory = ''
  }

  markAsCompleted(todoId: string): void {
    const todo = this.todos.find((t: any) => t.todoId === todoId);
    if (todo) {
      todo.completed = true;
      const index = this.uncompletedTodos.findIndex((t: any) => t.todoId === todoId);
      if (index !== -1) {
        this.uncompletedTodos.splice(index, 1)
        this.completedTodos.push(todo)
      }
    }
  }
}
