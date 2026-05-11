import { Component, effect, ElementRef, input, model, viewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
})
export class Modal {
  open = model(false);
  closable = input(true);
  private modal = viewChild<ElementRef<HTMLDialogElement>>('modal');

  constructor() {
    effect(() => {
      const dialog = this.modal()?.nativeElement;
      if (this.open()) {
        dialog?.showModal();
      } else {
        dialog?.close();
      }
    });
  }

  onCancel(event: Event) {
    if (!this.closable()) {
      event.preventDefault();
    }
  }
}
