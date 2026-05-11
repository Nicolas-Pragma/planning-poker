import { afterNextRender, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../services/supabaseservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from '../../components/atoms/button/button';
import { Input } from '../../components/atoms/input/input';
import { Radio } from '../../components/atoms/radio/radio';
import { Modal } from '../../components/molecules/modal/modal';
import { Main } from '../../components/templates/main/main';

@Component({
  selector: 'app-room',
  imports: [FormsModule, Button, Input, Radio, Modal, Main],
  templateUrl: './room.html',
})
export class Room {
  private supabaseService = inject(SupabaseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  playerName = signal('');
  role = signal('');
  playerId = signal('');
  showModal = signal(true);
  title = signal('');
  userInitials = signal('');

  async createPlayer() {
    this.title.set(history.state.roomName);

    this.userInitials.set(this.playerName().trim().slice(0, 2).toUpperCase());

    const roomId = this.route.snapshot.params['id'];
    const { data, error } = await this.supabaseService.addPlayerToRoom(
      roomId,
      this.playerName(),
      this.role(),
    );

    if (error) {
      console.error('Error creando jugador:', error);
      return;
    }

    this.playerId.set(data.id);

    const room = await this.supabaseService.getRoom(roomId);

    if (room.data && !room.data.admin_id) {
      await this.supabaseService.setAdmin(roomId, data.id);
    }

    this.showModal.set(false);
  }
}
