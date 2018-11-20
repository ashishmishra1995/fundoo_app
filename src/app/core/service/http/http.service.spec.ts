import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';

describe('HttpService', () => {
  let httpService: HttpService;
  beforeEach(() => TestBed.configureTestingModule({
    providers:[HttpService]
  }));

  it('should be created', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });
});
