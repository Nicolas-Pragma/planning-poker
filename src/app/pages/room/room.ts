import { afterNextRender, Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-room',
  imports: [FormsModule],
  templateUrl: './room.html',
})
export class Room {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;
  playerName = signal('');

  createPlayer() {
    console.log(`Jugador creado: ${this.playerName()}`);
  }

  constructor() {
    afterNextRender(() => {
      this.modal.nativeElement.showModal();
    });
  }
}
