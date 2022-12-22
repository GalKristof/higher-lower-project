import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTable, MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule
  ],
  exports: [
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule
  ]
})

export class MaterialModule {}