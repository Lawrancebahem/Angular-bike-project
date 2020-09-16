import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Overview1componentComponent } from './overview1component.component';

describe('Overview1componentComponent', () => {
  let component: Overview1componentComponent;
  let fixture: ComponentFixture<Overview1componentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Overview1componentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Overview1componentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
