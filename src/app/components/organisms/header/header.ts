import { Component, input } from '@angular/core';
import { Button } from '../../atoms/button/button';

@Component({
  selector: 'app-header',
  imports: [Button],
  templateUrl: './header.html',
})
export class Header {
  showItems = input(false);
  title = input('');
  userInitials = input('');
}
