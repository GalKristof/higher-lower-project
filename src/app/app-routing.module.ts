import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HubComponent } from './hub/hub.component';
import { TheGameComponent } from './the-game/the-game.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/hub', pathMatch: 'full'},
  { path: 'hub', component: HubComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'thegame', component: TheGameComponent},
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [TheGameComponent, LoginComponent, HubComponent, DashboardComponent, PageNotFoundComponent ];


