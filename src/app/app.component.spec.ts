/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing'

import { provide } from '@angular/core'

// https://gist.github.com/JohannesHoppe/c7715b947ef121cd58c9ffd4d4290fd5
/**
 * https://github.com/angular/angular/issues/9496#issuecomment-231194826
 * http://sinonjs.org/docs/
 */
import { Router, ActivatedRoute } from '@angular/router';
class MockRouter { createUrlTree() {} }
class MockActivatedRoute { }

import { AuthService } from './auth.service/index'
import { AppComponent } from './app.component'

beforeEachProviders(() => [
  AppComponent
  , AuthService
  // , Router
  , provide(Router, { useClass: MockRouter })
  , provide(ActivatedRoute, { useClass: MockActivatedRoute })
])

describe('App: NgTest', () => {
  it('should create the app'
      , inject([AppComponent], (app: AppComponent) => {
    expect(app).toBeTruthy()
  }))

  it('should have as title "Hello Wechaty"'
      , inject([AppComponent], (app: AppComponent) => {
    expect(app.title).toContain('Wechaty')
  }))
})
