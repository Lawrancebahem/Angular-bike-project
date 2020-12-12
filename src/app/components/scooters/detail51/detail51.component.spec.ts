import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Detail51Component } from './detail51.component';

describe('Detail51Component', () => {
  let component: Detail51Component;
  let fixture: ComponentFixture<Detail51Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Detail51Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Detail51Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
