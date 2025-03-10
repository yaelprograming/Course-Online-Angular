import { TestBed } from '@angular/core/testing';

import { JoinLeaveCoursesService } from './join-leave-courses.service';

describe('JoinLeaveCoursesService', () => {
  let service: JoinLeaveCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoinLeaveCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
