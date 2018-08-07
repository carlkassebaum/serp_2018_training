import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//Shared module
import { SharedModule } from '../shared/shared.module'
import { HeroDetailComponent } from './hero-detail.component';
import { ActivatedRouteStub, ActivatedRoute } from '../../testing';
import { HeroService } from '../hero.service';
import { TestHeroService } from '../test-hero.service';
//Helper from angular used to determine where we came from
import { Location } from '@angular/common';

//This is how you can pre-define an entire service! You don't use a spy object
//as the activated route is quite a complex beast!
let activatedRoute: ActivatedRouteStub;
let heroService: HeroService;

//Creating a router spi will intercept calls to whatever it's spying on
const locationSpy = jasmine.createSpyObj('Location', ['back']);

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async(() => {
    //Need to define this before using it in the test bed!
    activatedRoute = new ActivatedRouteStub();
    //Need to initialise the paramMap for the testing framework to make use of it
    activatedRoute.setParamMap({ id: 99999 });

    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [HeroDetailComponent],
      providers:
        [
          { provide: ActivatedRoute, useValue: activatedRoute },
          //For injectables, useClass works a charm! 
          { provide: HeroService, useClass: TestHeroService },
          { provide: Location, useValue: locationSpy }
        ]
        
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
