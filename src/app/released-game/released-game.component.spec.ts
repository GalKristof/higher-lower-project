import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasedGameComponent } from './released-game.component';

describe('ReleasedGameComponent', () => {
  let component: ReleasedGameComponent;
  let fixture: ComponentFixture<ReleasedGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleasedGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleasedGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
