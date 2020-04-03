import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignGroupComponent } from './foreign-group.component';

describe('ForeignGroupComponent', () => {
  let component: ForeignGroupComponent;
  let fixture: ComponentFixture<ForeignGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForeignGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeignGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
