import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Data } from './class';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class FormService {

  data = 'https://cs251-outlab-6.herokuapp.com/initial_values/';
  post = 'https://cs251-outlab-6.herokuapp.com/add_new_feedback/'
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getInfo(): Observable<Data> {
    return this.http.get<Data>(this.data).
    pipe(
    tap(_ => this.log('fetched data')),
    catchError(this.handleError<Data>('getInfo')));
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  postInfo(da: Data): Observable<Data> {
  return this.http.post<Data>(this.post, da, this.httpOptions)
  .pipe(
  tap(_ => this.log('posted data')),
      catchError(this.handleError('postInfo', da))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
