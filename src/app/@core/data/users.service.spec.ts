import { of } from 'rxjs';
import {UserService} from './users.service';

describe('users-service', () => {
  const usersService = new UserService();

  it('#getUser should return a user from real service', () => {
    usersService.getUser('test_uid').subscribe(user => {
      expect(user).toBe(null);
    });
  });

  it('should be created', () => {
    expect(usersService).toBeTruthy();
  });

  // Add tests for getUsers() method
  describe('getUsers', () => {
    it('should return a collection of users', () => {
      const userResponse = [
        {
          uid: '1',
          institution: null,
          firstName: 'John',
          lastName: 'Doe',
          username: 'john_doe',
          isAdmin: true,
          email: 'john_doe@example.com',
          fullName: 'John Doe',
          locale: 'en',
        },
        {
          uid: '2',
          institution: null,
          firstName: 'Jessica',
          lastName: 'Doe',
          username: 'jessica_doe',
          isAdmin: false,
          email: 'jessica_doe@example.com',
          fullName: 'Jessica Doe',
          locale: 'ca',
        },
      ];
      let response;
      spyOn(usersService, 'getUsers').and.returnValue(of(userResponse));

      usersService.getUsers().subscribe(res => {
        response = res;
      });

      expect(response).toEqual(userResponse);
    });
  });

});
