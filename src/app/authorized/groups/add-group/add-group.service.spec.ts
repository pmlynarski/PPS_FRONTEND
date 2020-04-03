import { TestBed } from '@angular/core/testing';

import { AddGroupService } from './add-group.service';

describe('AddGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddGroupService = TestBed.get(AddGroupService);
    expect(service).toBeTruthy();
  });
});
