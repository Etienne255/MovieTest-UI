import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie-service/movie-service';
import { MovieStats } from '../models/movie-stats';

@Component({
  selector: 'app-movies-rankings',
  templateUrl: './movies-rankings.component.html',
  styleUrls: ['./movies-rankings.component.css']
})
export class MoviesRankingsComponent implements OnInit {

  constructor(private movieService: MovieService) {

  }

  movieStats: MovieStats[];

  ngOnInit() {
    this.getMovieStats();
  }

  getMovieStats() {
    return this.movieService.getMovieStats().subscribe((data: MovieStats[]) => {
      this.movieStats = data;
    });
  }
}
