import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book-list/Book';

const URL = 'https://686efcb991e85fac429f77ee.mockapi.io/api/v1/books';

@Injectable({
  providedIn: 'root'
})
export class BookDataService {


  constructor(private http : HttpClient) { }

  public getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(URL);
  }

  public deleteBook(id: string): Observable<any> {
    return this.http.delete(`${URL}/${id}`);
  }
}
