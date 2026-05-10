import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliarHomeComponent } from './familiar-home.component';

describe('FamiliarHomeComponent', () => {
  let component: FamiliarHomeComponent;
  let fixture: ComponentFixture<FamiliarHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamiliarHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FamiliarHomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
