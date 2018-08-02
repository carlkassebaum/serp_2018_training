import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Need to import all components to allow the router to route to them
import { HeroesComponent }      from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

const routes: Routes = [
  //Default route for the application, otherwise the routing display will be blank
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //Route to the dashboard for /dashboard
  { path: 'dashboard', component: DashboardComponent },
  //Route to the HeroDetail component with an id parameter
  { path: 'detail/:id', component: HeroDetailComponent },
  //Route to the hero component when given all heroes
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  //Import the root helper 
  imports: [ RouterModule.forRoot(routes) ],
  //Export the module, allowing it for injection
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
