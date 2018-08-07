import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { asyncData, asyncError } from '../testing/async-observable-helpers';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';

const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

describe('HeroService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:
        [
          HeroService,
          { provide: MessageService, useValue: messageServiceSpy },
          { provide: HttpClient, useValue: httpClientSpy }
        ]
    });
  });

  it('should be created', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));
});
