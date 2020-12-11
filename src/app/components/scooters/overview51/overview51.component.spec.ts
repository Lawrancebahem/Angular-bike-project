import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Overview51Component } from './overview51.component';

describe('Overview51Component', () => {
  let component: Overview51Component;
  let fixture: ComponentFixture<Overview51Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Overview51Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Overview51Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
