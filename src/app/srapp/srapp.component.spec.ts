import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrappComponent } from './srapp.component';

describe('SrappComponent', () => {
  let component: SrappComponent;
  let fixture: ComponentFixture<SrappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
