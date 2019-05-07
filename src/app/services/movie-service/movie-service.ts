import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Movie } from '../../models/movie';
import { MovieStats } from '../../models/movie-stats';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  apiUrl = 'https://localhost:44369/api/Movies/';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<Movie[]>(this.apiUrl + 'GetMovies')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getMovieStats() {
    return this.http.get<MovieStats[]>(this.apiUrl + 'GetMovieStats')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  saveMovie(movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl + 'AddMovie', JSON.stringify(movie), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  editMovie(movie): Observable<Movie> {
    return this.http.put<Movie>(this.apiUrl + 'EditMovie', JSON.stringify(movie), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  deleteMovie(id) {
    return this.http.delete<Movie>(this.apiUrl + 'DeleteMovie/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
