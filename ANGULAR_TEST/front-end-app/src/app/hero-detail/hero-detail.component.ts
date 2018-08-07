// Input was imported to allow for rendering of this partial with predefined parameters!
import { Component, OnInit, Input } from '@angular/core';

import { Hero } from '../hero';

//Activated Route is a routing helper provided by angular. It's used to provide
//route details, which is used to get params. 
import { ActivatedRoute } from '@angular/router';
//Helper from angular used to determine where we came from
import { Location } from '@angular/common';

//Model service
import { HeroService }  from '../hero.service';

@Component({
  //Select this partial using <app-hero-detail></app-hero-detail>
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  //The rendering partial will provide the hero value
  @Input() hero: Hero;
    constructor(
    //Provide placeholder variables for injection by Anguar
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    //Get the hero that this page or partial was rendered with
    this.getHero();
  }

  getHero(): void {
    let id: number;
    //Get the id from the params of the route. "+" converts the string to an int
    this.route.paramMap.subscribe(pmap => id = +pmap.get('id'));
    //Call on getHero, using an asynchronous get operation. 
    this.heroService.getHero(id)
      //Callback initialises the hero parameter
      .subscribe(hero =>
        { 
          this.hero = hero
        });
  }

  goBack(): void 
  {
    this.location.back();
  }

  //Called on the click of the save button. Does not need a parameter
  //as [(ngModel)] is used in the view. 
  save(): void {
    this.heroService.updateHero(this.hero)
      //No result returned from updateHero. 
      .subscribe(() => this.goBack());
  }
}


