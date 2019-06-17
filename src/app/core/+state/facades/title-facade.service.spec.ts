import { TestBed } from '@angular/core/testing';

import { TitleFacadeService } from './title-facade.service';

describe('TitleFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TitleFacadeService = TestBed.get(TitleFacadeService);
    expect(service).toBeTruthy();
  });
});
