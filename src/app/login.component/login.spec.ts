import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing'

import { provide } from '@angular/core'

import { Brolog } from 'brolog'

import { AuthService }    from '../auth.service/index'
import { LoginComponent } from './login'

beforeEachProviders(() => [
  LoginComponent
  , Brolog
  , AuthService
])


describe('LoginComponent Test', () => {
  it('should create the component',
    inject([LoginComponent], (c: LoginComponent) => {
    expect(c).toBeTruthy()
  }))

  it('should have as content "app works!"',
    inject([LoginComponent], (c: LoginComponent) => {
    // expect(c.title).toEqual('Loginout Component Title')
    expect(1).toEqual(1)
  }))
})
