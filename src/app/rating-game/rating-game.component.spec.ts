import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingGameComponent } from './rating-game.component';

describe('RatingGameComponent', () => {
  let component: RatingGameComponent;
  let fixture: ComponentFixture<RatingGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
