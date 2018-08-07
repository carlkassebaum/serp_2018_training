import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { Hero } from '../hero';
//Use a routing stub: stub out "routerLink"
import { RouterLinkDirectiveStub } from "../../testing/router-link-directive-stub";
import { TestHeroService } from "../test-hero.service";
import { HeroService } from "../hero.service";

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let testHeroService: TestHeroService;

  beforeEach(async(() => {
    testHeroService = new TestHeroService();
    TestBed.configureTestingModule({
      declarations:
        [
          HeroesComponent,
          RouterLinkDirectiveStub
        ],
      providers:
        [
          { provide: HeroService, useValue: testHeroService }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
