import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('AppService', () => {
  let appService: AppService;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    appService = moduleRef.get<AppService>(AppService);
    httpService = moduleRef.get<HttpService>(HttpService);
  });

  describe('getMovieCategories', () => {
    it('should return an array of genres', (done) => {
      const genres = [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Comedy' },
      ];
      const response: AxiosResponse = {
        data: { genres },
        status: 0,
        statusText: '',
        headers: undefined,
        config: undefined,
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(response));

      appService.getMovieCategories().subscribe((result) => {
        expect(result).toEqual(genres);
        done();
      });
    });
  });
});
