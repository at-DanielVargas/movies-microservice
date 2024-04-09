import { Genre } from 'types';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';

@Injectable()
export class AppService {
  private readonly apiKey = process?.env?.MOVIEDB_KEY ?? '';
  private readonly apiToken = process?.env?.MOVIEDB_TOKEN ?? '';
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly language = 'es-MX';

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

    return this.httpService.get(url, options).pipe(
      map((response) => ({
        ...response.data,
        results: response.data.results.map((movie) => ({
          ...movie,
          backdrop_path: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
          poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        })),
      })),
    );
  }

  getMovies(): string {
    return 'Movies';
  }

  getMovie(id: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${id}?append_to_response=videos%2Cimages%2Creviews%2Crecommendations%2Csimilar%2Ccredits&api_key=${this.apiKey}&language=${this.language}`;
    const options = {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
      },
    };

    return this.httpService.get(url, options).pipe(
      map((response) => ({
        ...response.data,
        backdrop_path: `https://image.tmdb.org/t/p/original${response.data.backdrop_path}`,
        poster_path: `https://image.tmdb.org/t/p/original${response.data.poster_path}`,
        vote_average: (Number(response.data?.vote_average) / 10) * 5,
        credits: {
          ...response.data.credits,
          cast: response.data.credits.cast.map((actor) => ({
            ...actor,
            profile_path: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
          })),
        },
        related: response.data.similar.results.map((movie) => ({
          ...movie,
          backdrop_path: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
          poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        })),
      })),
    );
  }

  getRelatedMovies(id: number, page: number = 1): Observable<any> {
    const url = `${this.baseUrl}/movie/${id}/similar?api_key=${this.apiKey}&language=${this.language}&page=${page}`;
    const options = {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
      },
    };

    return this.httpService.get(url, options).pipe(
      map((response) => ({
        ...response.data,
        results: response.data.results.map((movie) => ({
          ...movie,
          backdrop_path: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
          poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        })),
      })),
    );
  }

  searchMovies(query: string, page: number = 1): Observable<any> {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=${this.language}&query=${query}&page=${page}&include_adult=false`;
    const options = {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
      },
    };

    return this.httpService.get(url, options).pipe(
      map((response) => ({
        ...response.data,
        results: response.data.results.map((movie) => ({
          ...movie,
          backdrop_path: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
          poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        })),
      })),
    );
  }

  getTrendingMovies(): Observable<any> {
    const url = `${this.baseUrl}/trending/movie/day?language=${this.language}`;

    const options = {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
      },
    };
    return this.httpService.get(url, options).pipe(
      map((response) => ({
        ...response.data,
        results: response.data.results.map((movie) => ({
          ...movie,
          backdrop_path: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
          poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        })),
      })),
      tap((response) => console.log(response)),
    );
  }
}
