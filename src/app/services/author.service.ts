import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http:HttpClient) { }
  async getAll() {
    const result = await lastValueFrom(this.http.get('http://localhost:3000/autores'));
    return result;
  }

  async create(author: any) {
    const result = await lastValueFrom(this.http.post('http://localhost:3000/autores', author));
    return result;
  }

  async delete(id: string) {
    const result = await lastValueFrom(this.http.delete(`http://localhost:3000/autores/${id}`));
    return result;
  }

  async edit(author: any) {
    const result = await lastValueFrom(this.http.put(`http://localhost:3000/autores/${author._id}`, author));
    return result;
  }
}
