import { TestBed } from '@angular/core/testing';

import { TasksFacade } from './tasks.facade';

describe('TasksFacade', () => {
  let service: TasksFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
