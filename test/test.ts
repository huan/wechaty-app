import { IoService } from '../app/io.service'

describe('Users factory', function() {
  const ioService = new IoService()
  // var Users;

  // // Before each test load our api.users module
  // beforeEach(angular.mock.module('api.users'));

  // // Before each test set our injected Users factory (_Users_) to our local Users variable
  // beforeEach(inject(function(_Users_) {
  //   Users = _Users_;
  // }));

  // // A simple test to verify the Users factory exists
  // it('should exist', function() {
  //   expect(Users).toBeDefined();
  // });
  it('test', () => {
    const a = 1
    expect(a).toEqual(1)
  })
})