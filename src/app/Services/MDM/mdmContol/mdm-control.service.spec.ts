import { TestBed } from '@angular/core/testing';

import { MdmControlService } from './mdm-control.service';

describe('MdmControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MdmControlService = TestBed.get(MdmControlService);
    expect(service).toBeTruthy();
  });
});
