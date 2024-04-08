import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { of } from 'rxjs';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getMovieCategories: jest.fn(),
            getMoviesFromCategory: jest.fn(),
            getRelatedMovies: jest.fn(),
            getMovies: jest.fn(),
            getMovie: jest.fn(),
            searchMovies: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
  });

  describe('getMovieCategories', () => {
    it('should call appService.getMovieCategories and return the result', () => {
      const genres = [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Comedy' },
      ];
      jest.spyOn(appService, 'getMovieCategories').mockReturnValue(of(genres));

      const result = appController.getMovieCategories();

      expect(appService.getMovieCategories).toHaveBeenCalled();
      expect(result).toEqual(genres);
    });
  });

  describe('getMoviesFromCategory', () => {
    it('should call appService.getMoviesFromCategory with the provided id and page, and return the result', () => {
      const id = 1;
      const page = 1;
      const movies = [
        { id: 1, title: 'Movie 1' },
        { id: 2, title: 'Movie 2' },
      ];
      jest
        .spyOn(appService, 'getMoviesFromCategory')
        .mockReturnValue(of(movies));

      const result = appController.getMoviesFromCategory({ id, page });

      expect(appService.getMoviesFromCategory).toHaveBeenCalledWith(id, page);
      expect(result).toEqual(of(movies));
    });
  });

  // Add tests for other methods in the AppController class
});
