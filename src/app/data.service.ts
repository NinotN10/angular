import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl = 'assets/data.json'; // Remplacez par le chemin vers votre fichier data.json

  data: any;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http.get<any>(this.dataUrl).pipe(map(data => {
        this.data = data;
        return data;
      }));
    }
  }

  getUsers(): Observable<any> {
    return this.getData().pipe(map(data => data.users));
  }

  getUserTodos(userId: string): Observable<any> {
    return this.getData().pipe(map(data => data.todos.filter((todo: any) => todo.userId === userId)));
  }
}
