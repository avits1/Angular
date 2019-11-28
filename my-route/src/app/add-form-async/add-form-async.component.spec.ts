import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormAsyncComponent } from './add-form-async.component';

describe('AddFormAsyncComponent', () => {
  let component: AddFormAsyncComponent;
  let fixture: ComponentFixture<AddFormAsyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormAsyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormAsyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
