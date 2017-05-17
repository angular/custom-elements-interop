import { SimpleFormPage } from './app.po';

describe('simple-form App', () => {
  let page: SimpleFormPage;

  beforeEach(() => {
    page = new SimpleFormPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
