import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCard } from './choose-card';

describe('ChooseCard', () => {
  let component: ChooseCard;
  let fixture: ComponentFixture<ChooseCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
