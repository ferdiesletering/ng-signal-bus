import { TestBed } from '@angular/core/testing';

import { NgSignalBusService } from './ng-signal-bus.service';

describe('NgSignalBusService', () => {
  let service: NgSignalBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgSignalBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
