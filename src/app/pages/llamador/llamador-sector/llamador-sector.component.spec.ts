import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadorSectorComponent } from './llamador-sector.component';

describe('LlamadorSectorComponent', () => {
  let component: LlamadorSectorComponent;
  let fixture: ComponentFixture<LlamadorSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlamadorSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlamadorSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
