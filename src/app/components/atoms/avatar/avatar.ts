import { Component, effect, input, signal } from '@angular/core';
import { avatar } from './avatar.variants';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.html',
})
export class Avatar {
  name = input<string>('');
  showName = input(false);
  userInitials = signal('');
  size = input<'small' | 'medium'>();

  get classes() {
    return avatar({ size: this.size() });
  }

  constructor() {
    effect(() => {
      this.userInitials.set(this.name().trim().slice(0, 2).toUpperCase());
    });
  }
}
