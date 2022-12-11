import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';





@NgModule({
  imports: [
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule
  ],
  exports: [
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule
  ]
})

export class MaterialModule {}