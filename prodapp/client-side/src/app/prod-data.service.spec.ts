import { TestBed } from '@angular/core/testing';

import { ProdDataService } from './prod-data.service';

describe('ProdDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdDataService = TestBed.get(ProdDataService);
    expect(service).toBeTruthy();
  });
});
