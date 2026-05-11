import { Component, computed, input } from '@angular/core';
import { Header } from '../../organisms/header/header';

@Component({
  selector: 'app-main',
  imports: [Header],
  templateUrl: './main.html',
})
export class Main {
  title = input.required<string>();
  userInitials = input.required<string>();

  showItems = computed(() => !!this.title() && !!this.userInitials());
}
