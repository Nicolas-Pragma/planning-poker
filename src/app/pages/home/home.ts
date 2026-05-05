import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: 'home.html',
})
export class Home implements OnInit {
  private router = inject(Router);
  showLogo = signal(true);
  gameName = signal('');
  createGame() {
    this.router.navigate(['/room', this.gameName()]);
  }

  ngOnInit() {
    setTimeout(() => {
      this.showLogo.set(false);
    }, 2000);
  }
}
