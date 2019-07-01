import { TestBed } from '@angular/core/testing';

import { MdmMainService } from './mdm-main.service';

describe('MdmMainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MdmMainService = TestBed.get(MdmMainService);
    expect(service).toBeTruthy();
  });
});
