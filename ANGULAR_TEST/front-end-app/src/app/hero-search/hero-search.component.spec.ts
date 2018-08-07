import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSearchComponent } from './hero-search.component';
//Use a routing DIRECTIVE stub: stub out "routerLink"
import { RouterLinkDirectiveStub } from "../../testing/router-link-directive-stub";
import { TestHeroService } from '../test-hero.service';
import { HeroService } from '../hero.service';

//Initialise the hero service, will inject later
let heroService: HeroService;

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:
        [
          //This will inject the HeroService when it builds the component
          { provide: HeroService, useClass: TestHeroService }
        ],
      declarations:
        [
          HeroSearchComponent,
          RouterLinkDirectiveStub
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
