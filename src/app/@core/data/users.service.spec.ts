import {UserService} from './users.service';

describe('users-service', () => {
  const usersService = new UserService();

  it('#getUser should return a user from real service', () => {
    usersService.getUser('test_uid').subscribe(user => {
      expect(user).toBe(null);
    });
  });
});
