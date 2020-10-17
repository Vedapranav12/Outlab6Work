import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Data } from './class';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { throwError } from 'rxjs';
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
    tap(_ => {this.log('fetched data')}),
    catchError(this.handleError)
    //this.log('error while fetching data')
    );

  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  postInfo(da: Data)  {
    return this.http.post<Data>(this.post, da, this.httpOptions).subscribe(
    (dat: Data) => {
        this.log('posted successfully');
        console.log(dat);
    },
    (err: any) => {
        this.log('error while posting');
        this.handleError(err);
    }
    );
  }
  private handleError(errorResponse: HttpErrorResponse) {
    alert('error');
    return throwError('error');
  }
  private log(message: string) {
    this.messageService.add(`${message}`);
  }
}
