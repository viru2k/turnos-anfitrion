import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadorColaComponent } from './llamador-cola.component';

describe('LlamadorColaComponent', () => {
  let component: LlamadorColaComponent;
  let fixture: ComponentFixture<LlamadorColaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlamadorColaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlamadorColaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
