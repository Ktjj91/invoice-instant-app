import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceUpdate } from './invoice-update';

describe('InvoiceUpdate', () => {
  let component: InvoiceUpdate;
  let fixture: ComponentFixture<InvoiceUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
