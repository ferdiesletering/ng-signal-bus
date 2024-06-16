import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSignalBusComponent } from './ng-signal-bus.component';

describe('NgSignalBusComponent', () => {
  let component: NgSignalBusComponent;
  let fixture: ComponentFixture<NgSignalBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgSignalBusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgSignalBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
