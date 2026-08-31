import { Component, input, output, signal } from '@angular/core';
import { Card } from '../../atoms/card/card';

@Component({
  selector: 'app-choose-card',
  imports: [Card],
  templateUrl: './choose-card.html',
})
export class ChooseCard {
  protected cards = signal<{ value: number | string; selected: boolean }[]>([
    { value: 0, selected: false },
    { value: 1, selected: false },
    { value: 3, selected: false },
    { value: 5, selected: false },
    { value: 8, selected: false },
    { value: 13, selected: false },
    { value: 21, selected: false },
    { value: 34, selected: false },
    { value: 55, selected: false },
    { value: 89, selected: false },
    { value: '?', selected: false },
    { value: '☕️', selected: false },
  ]);
  roomStatus = input<'voting' | 'revealed'>('voting');
  cardSelected = output<string>();

  ngOnChanges() {
    if (this.roomStatus() === 'revealed') {
      this.cards.set(this.cards().map((c) => ({ ...c, selected: false })));
    }
  }

  selectCard(card: number | string) {
    this.cardSelected.emit(String(card));
    this.cards.set(this.cards().map((c) => ({ ...c, selected: c.value === card })));
  }
}
