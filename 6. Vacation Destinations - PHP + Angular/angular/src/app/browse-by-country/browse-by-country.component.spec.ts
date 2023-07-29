import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseByCountryComponent } from './browse-by-country.component';

describe('BrowseByCountryComponent', () => {
  let component: BrowseByCountryComponent;
  let fixture: ComponentFixture<BrowseByCountryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrowseByCountryComponent]
    });
    fixture = TestBed.createComponent(BrowseByCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
