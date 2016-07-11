/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { MessageComponent } from './message';

beforeEachProviders(() => [MessageComponent]);

describe('MessageComponent Test', () => {
  it('should create the app',
      inject([MessageComponent], (message: MessageComponent) => {
    expect(message).toBeTruthy();
  }));

  it('should have as content \'app works!\'',
      inject([MessageComponent], (message: MessageComponent) => {
    expect(message.title).toEqual('Hello message');
  }));
});
