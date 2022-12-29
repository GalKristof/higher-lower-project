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
    isLoggedIn: false,
    whichGameIsCurrentlyPlaying: "none",
    userStatistics: {
      ratingGameTopScore: 0,
      releasedGameTopScore: 0,
      xp: 1600,
      lvl: 3
    }
  }
  users: UserData[] = [this.sysAdminUser, {
    username: 'BOT_9850',
    password: 'password7960',
    email: 'email1185@example.com',
    isLoggedIn: false,
    whichGameIsCurrentlyPlaying: 'none',
    userStatistics: {
      releasedGameTopScore: 743,
      ratingGameTopScore: 645,
      xp: 1678,
      lvl: 3
    }
  },
  {
    username: 'BOT_4148',
    password: 'password4202',
    email: 'email6201@example.com',
    isLoggedIn: false,
    whichGameIsCurrentlyPlaying: 'none',
    userStatistics: {
      releasedGameTopScore: 535,
      ratingGameTopScore: 907,
      xp: 1356,
      lvl: 2
    }
  },
  {
    username: 'BOT_3170',
    password: 'password3160',
    email: 'email4619@example.com',
    isLoggedIn: false,
    whichGameIsCurrentlyPlaying: 'none',
    userStatistics: {
      releasedGameTopScore: 10,
      ratingGameTopScore: 12,
      xp: 494,
      lvl: 0
    }
  }
];

  getUserArray()
  {
    return this.users;
  }

  fillUser(newUser: UserData)
  {
    this.users.push(newUser);
  }

}
