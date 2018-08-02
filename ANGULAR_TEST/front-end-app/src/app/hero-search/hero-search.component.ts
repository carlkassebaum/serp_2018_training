import { Component, OnInit } from '@angular/core';
 
import { Observable, Subject } from 'rxjs';
 
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
 
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
 
@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  //Convention to add $ to the name of an observable! 
  heroes$: Observable<Hero[]>;
  
  //RxJS Subject: A source of observable values, and is observable itself. 
  //Subscribe to a Subject as you would an observable! 
  private searchTerms = new Subject<string>();
 
  constructor(private heroService: HeroService) {}
 
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
 
  ngOnInit(): void {
    //This operation returns an observable object, which is the 
    //resulting set of searchTerms
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      // Only terms which qualify the debounceTime and distinctUntilChanged()
      // switchMap preserves the ordering of Observable operations! 
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    )
  }
}