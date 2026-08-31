import { Component, computed, input } from '@angular/core';
import { Header } from '../../organisms/header/header';

@Component({
  selector: 'app-main',
  imports: [Header],
  templateUrl: './main.html',
})
export class Main {
  title = input.required<string>();
  playerName = input.required<string>();

  showItems = computed(() => !!this.title() && !!this.playerName());
}
