import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDestinationComponent } from './delete-destination.component';

describe('DeleteDestinationComponent', () => {
  let component: DeleteDestinationComponent;
  let fixture: ComponentFixture<DeleteDestinationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDestinationComponent]
    });
    fixture = TestBed.createComponent(DeleteDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
