import { TestBed, inject }      from '@angular/core/testing';

import { RouterTestingModule }  from '@angular/router/testing'

import { Brolog }           from 'brolog'
import { AuthGuardService } from './auth-guard.service';
import { AuthService }      from './auth.service'

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuardService,
        AuthService,
        {
          provide: Brolog,
          useFactory() { return Brolog.instance('info') },
        },
      ]
    });
  });

  it('should ...', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
