describe('Bot Component', () => {

  beforeEach( () => {
    browser.get('/bot/1');
  });

  it('should have correct feature heading', () => {
    expect(element(by.css('about h2')).getText()).toEqual('Features');
  });

});
