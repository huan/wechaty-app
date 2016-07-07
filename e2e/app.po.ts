export class NgTestPage {
  navigateTo() {
    return browser.get('/')
  }

  getParagraphText() {
    return element(by.css('wechaty h1')).getText()
  }
}
