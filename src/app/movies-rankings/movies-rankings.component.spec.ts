import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesRankingsComponent } from './movies-rankings.component';

describe('MoviesRankingsComponent', () => {
  let component: MoviesRankingsComponent;
  let fixture: ComponentFixture<MoviesRankingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesRankingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
