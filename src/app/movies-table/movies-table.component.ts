import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Movie } from '../models/movie';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MovieService } from '../services/movie-service/movie-service';
import { NotificationService } from '../services/notification-service/notification-service';

@Component({
  selector: 'app-movies-table',
  templateUrl: './movies-table.component.html',
  styleUrls: ['./movies-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MoviesTableComponent implements OnInit {

  constructor(private movieService: MovieService, public notificationService: NotificationService) { }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['name', 'rating', 'category', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  movies: Movie[];
  tempmovies: Movie[];
  movie: Movie = {
    category: '',
    movieID: 0,
    name: '',
    rating: 0
  };
  tempmovie: Movie = {
    category: '',
    movieID: 0,
    name: '',
    rating: 0
  };
  slectedID;

  dataSource = new MatTableDataSource(this.movies);

  categories: string[] = [
    'Action',
    'Adventure',
    'Comedy',
    'Crime',
    'Drama',
    'Fantasy',
    'Historical'
  ];
  ratings: number[] = [
    1,
    2,
    3,
    4,
    5
  ];

  ngOnInit() {
    this.getMovies();
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getMovies() {
    return this.movieService.getMovies().subscribe((data: Movie[]) => {
      this.movies = data;
      this.dataSource = new MatTableDataSource(this.movies);
    });
  }

  saveMovie() {
    if (!this.checkItemExistence(this.movie)) {
      this.movieService.saveMovie(this.movie).subscribe();
      this.movies.push(this.movie);
      this.dataSource = new MatTableDataSource(this.movies);
      this.notificationService.showNotification('Successfully saved!', 'success');
    } else {
      this.notificationService.showNotification('The movie already exists', 'warning');
    }
  }

  saveEditMovie() {
    if (!this.checkItemExistenceEdit(this.tempmovie)) {
      this.movieService.editMovie(this.tempmovie).subscribe();
      this.notificationService.showNotification('Successfully saved!', 'success');
      let itemIndex = this.movies.findIndex(item => item.movieID === this.tempmovie.movieID);
      this.movies[itemIndex] = this.tempmovie;
      this.dataSource = new MatTableDataSource(this.movies);
    } else {
      this.notificationService.showNotification('The movie already exists', 'warning');
    }
  }

  deleteMovie(id) {
    this.movieService.deleteMovie(id).subscribe();
    this.movies = this.movies.filter(movie => movie.movieID !== id);
    this.dataSource = new MatTableDataSource(this.movies);
    this.notificationService.showNotification('Successfully deleted!', 'success');
  }

  editMovie(id) {
    this.tempmovie = new Movie();
    Object.assign(this.tempmovie, this.movies.find(x => x.movieID === id)) ;
  }

  checkItemExistence(item: Movie): boolean {
    return this.movies.some(r => r.name === item.name);
  }

  checkItemExistenceEdit(item: Movie): boolean {
    this.tempmovies = [];
    Object.assign(this.tempmovies, this.movies);
    this.tempmovies = this.movies.filter(movie => movie.movieID !== item.movieID);
    return this.tempmovies.some(r => r.name === item.name);
  }

  setID(id) {
    this.slectedID = id;
  }

}
