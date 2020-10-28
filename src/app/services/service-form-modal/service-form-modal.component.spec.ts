import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceFormModalComponent } from './service-form-modal.component';

describe('ServiceFormModalComponent', () => {
  let component: ServiceFormModalComponent;
  let fixture: ComponentFixture<ServiceFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
