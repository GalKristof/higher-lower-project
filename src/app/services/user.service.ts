import { Injectable } from '@angular/core';
import { UserData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  
  users: UserData[] = []

  getUserArray()
  {
    return this.users;
  }

  fillUser(newUser: UserData)
  {
    this.users.push(newUser);
  }

   generateBotUsers() {
    let howManyBots = 20;
    const botNames = ['Adam', 'Ben', 'Charlie', 'Diana', 'Eve', 'Joe', 'Angela', 'Drogo', 'Rebecca', 'Ainsley', 'Darell', 'Lionel', 'Wally', 'Patricia', 'Joan', 'John', 'Smith'];
   
    for (let i = 0; i < howManyBots; i++) {
      const randomName = botNames[Math.floor(Math.random() * botNames.length)];
      const randomPassword = Math.random().toString(36).substring(2, 15);
      const username = `BOT_${randomName}${Math.floor(Math.random() * 1000)}`;
      const email = `bot@${username}.com`;
  
      const user: UserData = {
        username,
        password: randomPassword,
        email,
        isLoggedIn: false,
        whichGameIsCurrentlyPlaying: "none",
        userStatistics: {
          releasedGameTopScore: 0,
          ratingGameTopScore: 0,
          xp: 0,
          lvl: 0,
        },
      };
  
      this.users.push(user);
      this.simulateBotsPlaying();
    }
  
    return this.users;
  }

  simulateBotsPlaying() {
    const botUsers = this.users.filter((user) => user.username.startsWith('BOT_'));
    botUsers.forEach((bot) => {
      const maxLevel = 20;
      let level = 0;
      while (Math.random() < 0.75 && level < maxLevel) {
        level += 1;
      }
      if (Math.random() < 0.5) {
        bot.userStatistics.releasedGameTopScore = Math.max(bot.userStatistics.releasedGameTopScore, level);
      } else {
        bot.userStatistics.ratingGameTopScore = Math.max(bot.userStatistics.ratingGameTopScore, level);
      }
      bot.userStatistics.xp += level * 15;
      bot.userStatistics.lvl = Math.floor(bot.userStatistics.xp / 500);
    });
  }

}
