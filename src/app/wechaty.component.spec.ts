import { Component } from '@angular/core'
import {
  it
  , describe
  , expect
  , beforeEach
  , inject
} from '@angular/core/testing'
import { TestComponentBuilder } from '@angular/compiler/testing'
import { By } from '@angular/platform-browser'

import { WechatyComponent } from './wechaty.component'

describe('Wechaty', _ => {
  let builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    builder = tcb;
  }));

  it('should emit a event after be instanciated', (done: () => void) => {
    return builder.createAsync(TestApp).then((fixture) => {
      let testComponent = fixture.debugElement.componentInstance
      let head = fixture.debugElement.nativeElement.querySelector('wechaty')

      testComponent.token = 'wechaty'
      fixture.detectChanges()

      expect(testComponent.nativeElement.classList.contains('wechaty')).toBe(true)

      testComponent.token = 'invalid'
      fixture.detectChanges()

      expect(testComponent.nativeElement.classList.contains('wechaty')).toBe(false)
      expect(testComponent.nativeElement.classList.contains('invalid')).toBe(true)

      done()
    })
  })

})

@Component({
  selector: 'test-app',
  template: `
    <wechaty [token]="token">
      <span>Test Wechaty</span>
    </wechaty>
  `,
  directives: [WechatyComponent]
})

class TestApp {
  token: string
}
