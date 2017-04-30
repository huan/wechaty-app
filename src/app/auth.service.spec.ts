import { TestBed, inject } from '@angular/core/testing';

import { Brolog }           from 'brolog'

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: Brolog,
          useFactory() { return Brolog.instance('info') }
        },
      ]
    });
  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
