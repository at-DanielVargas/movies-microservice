import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Genre } from './types/genre';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('get_movie_categories')
  getMovieCategories(): Observable<Genre[]> {
    return this.appService.getMovieCategories();
  }

  @EventPattern('get_movies_from_category')
  getMoviesFromCategory({
    id,
    page,
  }: {
    id: number;
    page: number;
  }): Observable<any> {
    return this.appService.getMoviesFromCategory(id, page);
  }

  @EventPattern('get_related_movies')
  getRelatedMovies(id: number): Observable<any> {
    return this.appService.getRelatedMovies(id);
  }

  @EventPattern('get_movies')
  getMovies(): string {
    return this.appService.getMovies();
  }

  @EventPattern('get_movie')
  getMovie(id: number): Observable<any> {
    return this.appService.getMovie(id);
  }

  @EventPattern('search_movies')
  searchMovies({
    query,
    page,
  }: {
    query: string;
    page: number;
  }): Observable<any> {
    return this.appService.searchMovies(query, page);
  }

  @EventPattern('get_trending_movies')
  getTrendingMovies(): Observable<any> {
    return this.appService.getTrendingMovies();
  }
}
