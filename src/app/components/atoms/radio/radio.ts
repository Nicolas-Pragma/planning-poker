import { Component, inject, input, model } from '@angular/core';
import { ControlContainer, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio',
  imports: [FormsModule],
  templateUrl: './radio.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
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
