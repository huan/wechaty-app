import { WechatyAppPage } from './app.po'

describe('Wechaty App', function() {
  let page: WechatyAppPage

  beforeEach(() => {
    page = new WechatyAppPage()
  })

  it('should display message saying "Wechaty APP"', () => {
    page.navigateTo()
    // const t = page.getParagraphText()
    // t.then(t => console.log(t))
    expect(page.title()).toEqual('Wechaty APP - Your cloud chatbot manager')

    expect(element(by.css('h1')).getText()).toEqual('Wechaty APP Dashboard')

    expect(1).toEqual(1)
    expect(browser.getTitle()).toEqual('Wechaty APP - Your cloud chatbot manager')

  })
})
