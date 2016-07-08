export class NgTestPage {
  navigateTo() {
    return browser.get('/')
  }

  getParagraphText() {
    return element(by.css('app-root')).getText()
  }
}
