import { Component, signal } from '@angular/core';
import { Base } from '../base/base';

@Component({
  selector: 'app-splash',
  imports: [Base],
  templateUrl: './splash.html',
})
export class Splash {
  showLogo = signal(true);

  ngOnInit() {
    setTimeout(() => {
      this.showLogo.set(false);
    }, 2000);
  }
}
