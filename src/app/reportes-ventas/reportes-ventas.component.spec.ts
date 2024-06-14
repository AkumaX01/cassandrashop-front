import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesVentasComponent } from './reportes-ventas.component';

describe('ReportesVentasComponent', () => {
  let component: ReportesVentasComponent;
  let fixture: ComponentFixture<ReportesVentasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesVentasComponent]
    });
    fixture = TestBed.createComponent(ReportesVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
