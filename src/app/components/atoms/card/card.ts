import { Component, input } from '@angular/core';
import { card } from './card.variants';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
})
export class Card {
  value = input<number | string>();
  label = input<string>();
  variant = input<'primary' | 'secondary' | 'tertiary'>();
  size = input<'small' | 'medium'>();
  state = input<'withValuePrimary' | 'withValue'>();

  get classes() {
    return card({ variant: this.variant(), size: this.size(), state: this.state() });
  }
}
