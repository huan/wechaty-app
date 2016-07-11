import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing'

import { LoginoutComponent } from './'

beforeEachProviders(() => [LoginoutComponent])

describe('LoginoutComponent Test', () => {
  it('should create the component',
      inject([LoginoutComponent], (c: LoginoutComponent) => {
    expect(c).toBeTruthy()
  }))

  it('should have as content "app works!"',
      inject([LoginoutComponent], (c: LoginoutComponent) => {
    expect(c.title).toEqual('Loginout Component Title')
  }))
})
