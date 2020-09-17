import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Overview2componentComponent } from './overview2component.component';

describe('Overview2componentComponent', () => {
  let component: Overview2componentComponent;
  let fixture: ComponentFixture<Overview2componentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Overview2componentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Overview2componentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
