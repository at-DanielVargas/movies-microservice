import { Genre } from 'types';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private readonly apiKey = process?.env?.MOVIEDB_KEY ?? '';
  private readonly apiToken = process?.env?.MOVIEDB_TOKEN ?? '';
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly language = 'es-ES';

  constructor(private readonly httpService: HttpService) {}

  /**
   * This function retrieves a list of movie genres from a specified API endpoint using HTTP GET
   * request with authorization headers.
   * @returns An Observable of an array of Genre objects is being returned.
   */
  getMovieCategories(): Observable<Genre[]> {
    const url = `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}&language=${this.language}`;
    const options = {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
      },
    };

    return this.httpService
      .get(url, options)
      .pipe(map((response) => response.data.genres));
  }

  /**
   * The function `getMoviesFromCategory` retrieves movies from a specific category using an API call
   * in TypeScript.
   * @param {number} categoryId - The `categoryId` parameter in the `getMoviesFromCategory` function
   * represents the unique identifier for a specific movie category or genre. This parameter is used to
   * filter and retrieve movies that belong to the specified category from the movie database.
   * @returns An Observable is being returned, which will emit the data from the HTTP request to fetch
   * movies based on the provided category ID. The data emitted by the Observable will be the response
   * data from the API call after mapping it to extract the necessary information.
   */
  getMoviesFromCategory(categoryId: number, page: number = 1): Observable<any> {
    const url = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&language=${this.language}&with_genres=${categoryId}sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`;
    const options = {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
      },
    };

    return this.httpService
      .get(url, options)
      .pipe(map((response) => response.data));
  }

  getMovies(): string {
    return 'Movies';
  }

  getMovie(id: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=${this.language}`;
    const options = {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
      },
    };

    return this.httpService
      .get(url, options)
      .pipe(map((response) => response.data));
  }

  getRelatedMovies(id: number): string {
    return 'Hello World!' + id;
  }

  searchMovies(query: string, page: number = 1): Observable<any> {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=${this.language}&query=${query}&page=${page}&include_adult=false`;

    const options = {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
      },
    };

    return this.httpService
      .get(url, options)
      .pipe(map((response) => response.data));
  }
}
