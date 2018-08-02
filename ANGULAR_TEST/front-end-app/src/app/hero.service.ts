import { Injectable } from '@angular/core';
import { Hero } from './hero';
//For observables, required for http requests/responses
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
//For http requests
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

//HTTP Headers required for put and post operations!
const httpOptions = {
  //For put and post requests!
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

//Provide this service as an injectable item
@Injectable({
  providedIn: 'root'
})

export class HeroService {

  //We could do something similar to this.
  //IE we could have an api service per web api we decide to use! 
  private heroesUrl = 'api/heroes';  // URL to web api  

  //Access the application message service
  //Could use this kind of like flash if we wanted to do that. 
  constructor(private messageService: MessageService,
              private http: HttpClient) 
  { }
  /** Log a HeroService message with the MessageService */
  private log(message: string) 
  {
    this.messageService.add(`HeroService: ${message}`);
  }

  //For us, this method will be a call to our .NET Core API, which will then
  //Go off to the MySQL database!
  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        //Tap accesses the return value of the observable operation, 
        //does something with it, then continues on 
        tap(heroes => this.log('fetched heroes')),
        //Pass errors to the error handler for the application
        catchError(this.handleError('getHeroes', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> 
  {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      //Same idea with tap
      //_ represents an unnamed parameter
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }


  //Google docs style of parameter documentation
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      //same idea with tap and unnamed parameter
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> 
  {
    //POST returns the object that was added to the server
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  //Lets hero be a number or a Hero object, depending on where the method is called from
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }  

}
