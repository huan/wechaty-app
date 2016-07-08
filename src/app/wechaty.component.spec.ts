import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing'

import { WechatyComponent } from './wechaty.component'

beforeEachProviders(() => [WechatyComponent])

describe('WechatyComponent Test', () => {
  it('should create the app',
      inject([WechatyComponent], (wechaty: WechatyComponent) => {
    expect(wechaty).toBeTruthy()
  }))

  it('should have as content "app works!"',
      inject([WechatyComponent], (wechaty: WechatyComponent) => {
    expect(wechaty.token).toEqual('')
  }))
})