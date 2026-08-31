import { Component, inject, input, model } from '@angular/core';
import { ControlContainer, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [FormsModule],
  templateUrl: './input.html',
  host: { '[attr.id]': 'null' },
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true, optional: true }),
    },
  ],
})
export class Input {
  id = input<string>('');
  name = input.required<string>();
  label = input<string>('');
  required = input(false);
  minLength = input<number>(0);
  maxLength = input<number>(100);
  pattern = input<string>('');
  error = input<string>('');
  value = model('');
  disabled = input(false);
}
