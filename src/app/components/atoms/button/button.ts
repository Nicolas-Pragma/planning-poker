import { Component, input, output } from '@angular/core';
import { button } from './button.variants';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
})
export class Button {
  disabled = input(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  variant = input<'primary' | 'secondary' | 'tertiary'>();

  get classes() {
    return button({ variant: this.variant() });
  }
}
