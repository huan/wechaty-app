import {
  beforeEachProviders
  , describe
  , expect, it
  , inject
} from '@angular/core/testing'

import { Brolog } from 'brolog'

import { WechatyComponent } from './wechaty'

beforeEachProviders(() => [WechatyComponent, Brolog])

describe('WechatyComponent Test', () => {
  it('should create the app'
    , inject([WechatyComponent], (wechaty: WechatyComponent) => {
      expect(wechaty).toBeTruthy()
    })
  )

  it('should have as content "app works!"',
    inject([WechatyComponent], (wechaty: WechatyComponent) => {
      expect(wechaty.token).toEqual('')
    })
  )
})
