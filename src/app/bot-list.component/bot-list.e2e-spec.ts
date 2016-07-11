describe('BotList', () => {

  beforeEach( () => {
    browser.get('/bot-list');
  });

  it('should have correct feature heading', () => {
    expect(element(by.css('bot-list h2')).getText()).toEqual('Features');
  });

});
