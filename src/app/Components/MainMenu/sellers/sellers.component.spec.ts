import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersComponent } from './sellers.component';

describe('SellersComponent', () => {
  let component: SellersComponent;
  let fixture: ComponentFixture<SellersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellersComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
