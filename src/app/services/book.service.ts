import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }
  async getAll() {
    const result = await lastValueFrom(this.http.get('http://localhost:3000/livros'));
    return result;
  }

  async create(book: any) {
    const result = await lastValueFrom(this.http.post('http://localhost:3000/livros', book));
    return result;
  }

  async delete(id: string) {
    const result = await lastValueFrom(this.http.delete(`http://localhost:3000/livros/${id}`));
    return result;
  }

  async edit(book: any) {
    const result = await lastValueFrom(this.http.put(`http://localhost:3000/livros/${book._id}`, book));
    return result;
  }  
}
