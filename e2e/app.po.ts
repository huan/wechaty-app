export class WechatyAppPage {
  navigateTo() {
    return browser.get('/')
  }

  getParagraphText() {
    return element(by.css('app-root')).getText()
  }

  title() {
    return browser.getTitle()
  }
}
