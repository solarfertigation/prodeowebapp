import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gaugechart90Component } from './gaugechart90.component';

describe('Gaugechart90Component', () => {
  let component: Gaugechart90Component;
  let fixture: ComponentFixture<Gaugechart90Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Gaugechart90Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Gaugechart90Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
