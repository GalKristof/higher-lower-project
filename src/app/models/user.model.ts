export interface UserData {
    username: string
    password: string
    email: string
    isLoggedIn: boolean
    whichGameIsCurrentlyPlaying: string
    userStatistics: {
      releasedGameTopScore: number
      ratingGameTopScore: number
      xp: number
      lvl: number
    }
  }