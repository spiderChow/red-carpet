import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominatePageComponent } from './nominate-page.component';

describe('NominatePageComponent', () => {
  let component: NominatePageComponent;
  let fixture: ComponentFixture<NominatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
