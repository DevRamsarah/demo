import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BullyingComponent } from './bullying.component';

describe('BullyingComponent', () => {
  let component: BullyingComponent;
  let fixture: ComponentFixture<BullyingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BullyingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BullyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
