import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book-list/Book';

const URL = 'https://6878057131d28a460e1cfd43.mockapi.io/Books';

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

  public updateBookStock(book : Book) : Observable<Book> {
    const bookId = String(book.id);
  const { id, ...bookWithoutId } = book;
  
  console.log('📡 URL:', `${URL}/${bookId}`);
  console.log('📦 Body:', bookWithoutId);
  
  return this.http.put<Book>(`${URL}/${bookId}`, bookWithoutId);
  }
}
