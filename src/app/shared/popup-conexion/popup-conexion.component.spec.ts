import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupConexionComponent } from './popup-conexion.component';

describe('PopupConexionComponent', () => {
  let component: PopupConexionComponent;
  let fixture: ComponentFixture<PopupConexionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupConexionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupConexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
