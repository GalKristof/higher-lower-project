import { Injectable } from '@angular/core';
import { UserData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  sysAdminUser: UserData = {
    username: 'admin',
    password: 'admin',
    email: 'admin@admin.com',
    isLoggedIn: true,
    whichGameIsCurrentlyPlaying: "none",
    userStatistics: {
      ratingGameTopScore: 30,
      releasedGameTopScore: 10,
      xp: 2000,
      lvl: 7
    }
  }
  users: UserData[] = [this.sysAdminUser];

  getUserArray()
  {
    return this.users;
  }

  fillUser(newUser: UserData)
  {
    this.users.push(newUser);
  }

}
