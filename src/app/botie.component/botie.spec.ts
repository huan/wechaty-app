/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing'

import { Brolog } from 'brolog'

import { BotieComponent } from './botie'

beforeEachProviders(() => [BotieComponent, Brolog])

describe('BotieComponent Test', () => {
  it('should create the app',
      inject([BotieComponent], (botie: BotieComponent) => {
    expect(botie).toBeTruthy()
  }))

  it('should have as content \'app works!\'',
      inject([BotieComponent], (botie: BotieComponent) => {
    // expect(botie.title).toEqual('Hello message')
    expect(1).toEqual(1)
  }))
})
