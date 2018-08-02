import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // List of heroes to display
  heroes: Hero[];

  //Inject a HeroService object, available as heroService
  constructor(private heroService: HeroService) { }

  ngOnInit() 
  {
    //on initialisation, call getHeroes
    this.getHeroes();
  }

  //Called when the corresponding field on the heroes.component.html template is clicked.
  add(name: string): void 
  {
    name = name.trim();
    if (!name) { return; }
    //{name} as Hero: Creates a new hero with the name attribute 

    //Add a hero to the database, also add it to the view
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  //Called to initialise the heroes array
  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  //Called when a delete button is pressed. Removes the element from the list and deletes from the server!
  delete(hero: Hero): void {
    //Remove the hero from the list of heroes
    this.heroes = this.heroes.filter(h => h !== hero);
    //Remove the hero from the database
    this.heroService.deleteHero(hero).subscribe();
  }
}
