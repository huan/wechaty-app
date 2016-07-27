import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing'

import { LoginComponent } from './'

beforeEachProviders(() => [LoginComponent])

describe('LoginoutComponent Test', () => {
  it('should create the component',
      inject([LoginComponent], (c: LoginComponent) => {
    expect(c).toBeTruthy()
  }))

  it('should have as content "app works!"',
      inject([LoginComponent], (c: LoginComponent) => {
    expect(c.title).toEqual('Loginout Component Title')
  }))
})
