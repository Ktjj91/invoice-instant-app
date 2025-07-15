import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientUpdate } from './client-update';

describe('ClientUpdate', () => {
  let component: ClientUpdate;
  let fixture: ComponentFixture<ClientUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
