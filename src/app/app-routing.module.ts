import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RatingGameComponent } from './rating-game/rating-game.component';
import { ReleasedGameComponent } from './released-game/released-game.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HubComponent } from './hub/hub.component';

const routes: Routes = [
  { path: '', redirectTo: 'hub', pathMatch: 'full'},
  { path: 'hub', component: HubComponent},
  { path: 'ratinggame', component: RatingGameComponent},
  { path: 'releasedgame', component: ReleasedGameComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [RatingGameComponent, ReleasedGameComponent, LoginComponent, HubComponent,  PageNotFoundComponent ];


