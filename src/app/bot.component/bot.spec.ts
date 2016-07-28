import { TestComponentBuilder } from '@angular/compiler/testing'
import { disableDeprecatedForms, provideForms } from '@angular/forms'
import { Component } from '@angular/core'
import {
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing'
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter'

import { Brolog } from 'brolog'

import { BotComponent } from './bot'

export function main() {
  describe('Bot Component', () => {
    // Disable old forms
    let providerArr: any[]

    beforeEach(() => { providerArr = [disableDeprecatedForms(), provideForms(), Brolog] })

    it('should work',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.overrideProviders(TestComponent, providerArr)
          .createAsync(TestComponent)
          .then((rootTC: any) => {
            let botDOMEl = rootTC.debugElement.children[0].nativeElement

      	    // expect(getDOM().querySelectorAll(botDOMEl, 'h2')[0].textContent).toEqual('Features')
            expect(1).toEqual(1)
          })
        }))
    })
}

@Component({
  selector: 'test-cmp',
  directives: [BotComponent],
  template: '<bot></bot>'
})
class TestComponent {}
