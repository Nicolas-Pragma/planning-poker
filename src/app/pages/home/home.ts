import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../services/supabaseservice';
import { Button } from '../../components/atoms/button/button';
import { Input } from '../../components/atoms/input/input';
import { Splash } from '../../components/templates/splash/splash';

@Component({
  selector: 'app-home',
  imports: [FormsModule, Button, Input, Splash],
  templateUrl: 'home.html',
})
export class Home implements OnInit {
  private router = inject(Router);
  private supabaseService = inject(SupabaseService);
  showLogo = signal(true);
  roomName = signal('');

  async createRoom() {
    const { data, error } = await this.supabaseService.createRoom(this.roomName());
    if (error) {
      console.error('Error creando sala:', error);
      return;
    }

    this.router.navigate(['/room', data.id], { state: { roomName: this.roomName() } });
  }

  ngOnInit() {
    setTimeout(() => {
      this.showLogo.set(false);
    }, 2000);
  }
}
