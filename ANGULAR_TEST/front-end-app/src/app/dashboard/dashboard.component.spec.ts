import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

//Still need to import the original source code in some cases
import { Router } from '@angular/router';
//So then jasmine can understand what it is actually stubbing out!
import { HeroService } from '../hero.service';
import { RouterTestingModule } from '@angular/router/testing';
//Use a routing stub: stub out "routerLink"
import { RouterLinkDirectiveStub } from "../../testing/router-link-directive-stub";
//Give a method which returns a set of test heroes!
import { getTestHeroes } from '../test-heroes';
//Get a set of helpers from the testing directory
// - asyncData takes in a function and returns whatever it returned as an observable!
import { asyncData } from '../../testing';

@Component({ selector: 'app-hero-search', template: '' })
class AppHeroSearchStubComponent { }

//Creating a router spi will intercept calls to whatever it's spying on
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

//Create a spy object for the heroService, and have it respond to getHeroes()
const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations:
        [
          DashboardComponent,
          //Need to declare here for the test suite to access it at compile time
          RouterLinkDirectiveStub,
          AppHeroSearchStubComponent
        ],
      providers:
        [
          { provide: HeroService, useValue: heroServiceSpy },
          { provide: Router, useValue: routerSpy }
        ]
    })
      .compileComponents().then(() => {
        //Defines the heroServiceSpy getHeroes method and tells it what to actually return!
        heroServiceSpy.getHeroes.and.returnValue(asyncData(getTestHeroes()));
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
