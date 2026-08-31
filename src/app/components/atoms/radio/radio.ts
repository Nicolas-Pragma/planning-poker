import { Component, inject, input, model } from '@angular/core';
import { ControlContainer, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio',
  imports: [FormsModule],
  templateUrl: './radio.html',
  host: { '[attr.id]': 'null' },
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true, optional: true }),
    },
  ],
})
export class Radio {
  id = input('');
  label = input.required<string>();
  name = input.required<string>();
  value = input.required<string>();
  selected = model('');
  required = input(false);
}
