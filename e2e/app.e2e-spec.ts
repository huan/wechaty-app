import { NgTestPage } from './app.po';

describe('ng-test App', function() {
  let page: NgTestPage;

  beforeEach(() => {
    page = new NgTestPage();
  });

  it('should display message saying !$#$ app works', () => {
    page.navigateTo()
    const t = page.getParagraphText()
    t.then(t => console.log(t))
    // const t = browser.getTitle()
    // t.then(title => console.log(title))
    expect(t).toEqual('lala')
    // expect(1).toEqual(1)
  });
});
