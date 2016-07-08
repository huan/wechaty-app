import { NgTestPage } from './app.po'

describe('Wechaty App', function() {
  let page: NgTestPage

  beforeEach(() => {
    page = new NgTestPage()
  })

  it('should display message saying !$#$ app works', () => {
    page.navigateTo()
    // const t = page.getParagraphText()
    // t.then(t => console.log(t))
    // const t = browser.getTitle()
    // t.then(title => console.log(title))
    // expect(t).toEqual('Wechaty Web Component for Angular 2')


    expect(element(by.css('.zixia')).getText()).toEqual('Hello Wechaty')

    expect(1).toEqual(1)
    // expect(browser.getTitle()).toEqual('Wechaty APP')

  })
})
