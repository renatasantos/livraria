import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  async getAll() {
    const result = await lastValueFrom(this.http.get('http://localhost:3000/usuarios'));
    return result;
  }

  async create(user: any) {
    const result = await lastValueFrom(this.http.post('http://localhost:3000/usuarios', user));
    return result;
  }

  async delete(id: string) {
    const result = await lastValueFrom(this.http.delete(`http://localhost:3000/usuarios/${id}`));
    return result;
  }

  async edit(user: any) {
    const result = await lastValueFrom(this.http.put(`http://localhost:3000/usuarios/${user._id}`, user));
    return result;
  }
}
