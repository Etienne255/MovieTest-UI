import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MaterialsModule } from './app-materials.module';
import { MoviesTableComponent } from './movies-table/movies-table.component';
import { MovieService } from './services/movie-service/movie-service';
import { NotificationService } from './services/notification-service/notification-service';
import { MoviesRankingsComponent } from './movies-rankings/movies-rankings.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MoviesTableComponent,
    MoviesRankingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    HttpClientModule,
  ],
  providers: [MovieService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
