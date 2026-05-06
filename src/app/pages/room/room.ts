import { afterNextRender, Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-room',
  imports: [FormsModule],
  templateUrl: './room.html',
})
export class Room {
  modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  playerName = signal('');
  role = signal('');

  createPlayer() {
    console.log(`Jugador creado: ${this.playerName()} ${this.role()}`);
    this.modal()?.nativeElement.close();
  }

  constructor() {
    afterNextRender(() => {
      this.modal()?.nativeElement.showModal();
    });
  }
}
