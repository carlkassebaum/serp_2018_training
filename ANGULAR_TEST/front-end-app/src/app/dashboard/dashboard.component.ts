import { Component, OnInit } from '@angular/core';
//Access the Hero class defined in the hero.ts file
import { Hero } from '../hero';
//Access the HeroService class defined in the hero.service.ts file
import { HeroService } from '../hero.service';
 
@Component({
  //Names the HTML selector to use to display the template
  selector: 'app-dashboard',
  //The path to the template
  templateUrl: './dashboard.component.html',
  //Path to the style sheet for this template
  styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent implements OnInit 
{
  //List of heroes that will be fetched from the server
  //This is the list of heroes that will be displayed on the dashboard
  //This variable is only defined in the context of the dashboard view
  heroes: Hero[] = [];
 
  //Inject the heroService element for use in this class
  //Initialisation can go here. Actions CANNOT! 
  constructor(private heroService: HeroService) { }
 
  //Called on intialisation, place initialisiation code here 
  //This is where initial actions go!
  ngOnInit() {
    this.getHeroes();
  }
 
  //Call on the hero service to get teh hero data 
  getHeroes(): void 
  {
    //Subscribe is used to handle the results of the heroService
    //heroService.getHeroes returns an observable, which requires a subscribe 
    //action to listen to the result. The heroes parameter is filled by the subscribe
    //method. 
    this.heroService.getHeroes().subscribe(heroes => 
      { 
        this.heroes = heroes.slice(1, 5) 
      });
  }
}