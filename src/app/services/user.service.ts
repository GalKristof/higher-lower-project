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
    whichGameIsCurrentlyPlaying: "Kiadott év-játék",
    userStatistics: {
      ratingGameTopScore: 30,
      releasedGameTopScore: 10,
      xp: 2000,
      lvl: 7
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
      xp: 966,
      lvl: 869
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
      xp: 736,
      lvl: 674
    }
  },
  {
    username: 'BOT_3170',
    password: 'password3160',
    email: 'email4619@example.com',
    isLoggedIn: false,
    whichGameIsCurrentlyPlaying: 'none',
    userStatistics: {
      releasedGameTopScore: 588,
      ratingGameTopScore: 691,
      xp: 494,
      lvl: 677
    }
  },
  {
    username: 'BOT_8414',
    password: 'password2077',
    email: 'email1275@example.com',
    isLoggedIn: false,
    whichGameIsCurrentlyPlaying: 'none',
    userStatistics: {
      releasedGameTopScore: 878,
      ratingGameTopScore: 995,
      xp: 786,
      lvl: 891
    }
  },
  {
    username: 'BOT_6519',
    password: 'password6829',
    email: 'email4739@example.com',
    isLoggedIn: false,
    whichGameIsCurrentlyPlaying: 'none',
    userStatistics: {
      releasedGameTopScore: 537,
      ratingGameTopScore: 832,
      xp: 562,
      lvl: 547
    }
  },
  {
    username: 'BOT_9481',
    password: 'password7376',
    email: 'email2713@example.com',
    isLoggedIn: false,
    whichGameIsCurrentlyPlaying: 'none',
    userStatistics: {
      releasedGameTopScore: 872,
      ratingGameTopScore: 712,
      xp: 994,
      lvl: 713
    }
  },
  {
    username: 'BOT_9073',
    password: 'password8260',
    email: 'email7723@example.com',
    isLoggedIn: false,
    whichGameIsCurrentlyPlaying: 'none',
    userStatistics: {
      releasedGameTopScore: 572,
      ratingGameTopScore: 502,
      xp: 627,
      lvl: 463
    }
  },
  {
    username: 'BOT_9869',
    password: 'password5809',
    email: 'email8665@example.com',
    isLoggedIn: false,
    whichGameIsCurrentlyPlaying: 'none',
    userStatistics: {
      releasedGameTopScore: 617,
      ratingGameTopScore: 968,
      xp: 729,
      lvl: 573
    }
  },
  {
    username: 'BOT_4501',
    password: 'password1340',
    email: 'email7269@example.com',
    isLoggedIn: false,
    whichGameIsCurrentlyPlaying: 'none',
    userStatistics: {
      releasedGameTopScore: 671,
      ratingGameTopScore: 682,
      xp: 217,
      lvl: 464
    }
  },
  {
    username: 'BOT_8735',
    password: 'password1073',
    email: 'email3071@example.com',
    isLoggedIn: false,
    whichGameIsCurrentlyPlaying: 'none',
    userStatistics: {
      releasedGameTopScore: 853,
      ratingGameTopScore: 876,
      xp: 879,
      lvl: 862
    }
  },
  {
    username: 'BOT_3149',
    password: 'password7577',
    email: 'email8287@example.com',
    isLoggedIn: false,
    whichGameIsCurrentlyPlaying: 'none',
    userStatistics: {
      releasedGameTopScore: 860,
      ratingGameTopScore: 627,
      xp: 876,
      lvl: 876
    }
  },
  {
    username: 'BOT_6535',
    password: 'password2080',
    email: 'email4389@example.com',
    isLoggedIn: false,
    whichGameIsCurrentlyPlaying: 'none',
    userStatistics: {
      releasedGameTopScore: 886,
      ratingGameTopScore: 684,
      xp: 607,
      lvl: 876
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
