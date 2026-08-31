import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../services/supabaseservice';
import { ActivatedRoute } from '@angular/router';
import { Button } from '../../components/atoms/button/button';
import { Input } from '../../components/atoms/input/input';
import { Radio } from '../../components/atoms/radio/radio';
import { Modal } from '../../components/molecules/modal/modal';
import { Main } from '../../components/templates/main/main';
import { ChooseCard } from '../../components/molecules/choose-card/choose-card';
import { Table } from '../../components/organisms/table/table';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export interface Room {
  id: string;
  name: string;
  status: 'voting' | 'revealed';
  admin_id: string | null;
  created_at: string;
}

export interface Player {
  id: string;
  name: string;
  role: 'player' | 'spectator';
  vote: string | null;
  room_id: string;
  created_at: string;
}

@Component({
  selector: 'app-room',
  imports: [FormsModule, Button, Input, Radio, Modal, Main, ChooseCard, Table],
  templateUrl: './room.html',
})
export class Room {
  private supabaseService = inject(SupabaseService);
  private route = inject(ActivatedRoute);

  playerName = signal('');
  role = signal('');
  playerId = signal('');
  showModal = signal(true);
  title = signal('');
  players = signal<Player[]>([]);
  roomStatus = signal<'voting' | 'revealed'>('voting');
  roomId = this.route.snapshot.params['id'];
  roomIdAdmin = signal('');
  showMessageFullRoom = signal(false);

  async createPlayer() {
    const { data: existingPlayers } = await this.supabaseService.getPlayers(this.roomId);
    if (existingPlayers && existingPlayers.length >= 8) {
      this.showMessageFullRoom.set(true);
      return;
    }
    const { data: playerData, error: playerError } = await this.supabaseService.addPlayerToRoom(
      this.roomId,
      this.playerName(),
      this.role(),
    );

    if (playerError) {
      console.error('Error creando jugador:', playerError);
      return;
    }

    this.playerId.set(playerData.id);

    const { data: roomData, error: roomError } = await this.supabaseService.getRoom(this.roomId);
    if (roomError) {
      console.error('Error obteniendo sala:', roomError);
      return;
    }
    this.title.set(roomData?.name || '');
    this.roomStatus.set(roomData?.status || 'voting');

    if (roomData && !roomData.admin_id) {
      const { data: adminData, error: adminError } = await this.supabaseService.setAdmin(
        this.roomId,
        playerData.id,
      );
      if (adminError) {
        console.error('Error setting admin:', adminError);
      }
      this.roomIdAdmin.set(adminData?.admin_id || '');
    }

    this.showModal.set(false);

    this.loadPlayers();
    this.subscribeToRoom();
  }

  private async loadPlayers() {
    const { data } = await this.supabaseService.getPlayers(this.roomId);
    if (data) {
      this.players.set(data);
    }
  }

  private handlePlayerChange(payload: RealtimePostgresChangesPayload<Player>) {
    const current = this.players();

    if (payload.eventType === 'INSERT') {
      this.players.set([...current, payload.new]);
    }

    if (payload.eventType === 'UPDATE') {
      this.players.set(
        current.map((player) => (player.id === payload.new.id ? payload.new : player)),
      );
    }

    if (payload.eventType === 'DELETE') {
      this.players.set(current.filter((player) => player.id !== payload.old.id));
    }
  }

  private subscribeToRoom() {
    this.supabaseService.subscribeToRoom(this.roomId, {
      onPlayerChange: (payload) => {
        this.handlePlayerChange(payload);
      },
      onRoomChange: (payload) => {
        if ('status' in payload.new) {
          this.roomStatus.set(payload.new.status);
        }
      },
    });
  }

  async onVote(value: string) {
    const { error } = await this.supabaseService.vote(this.playerId(), value);
    if (error) {
      console.error('Error votando:', error);
    }
  }

  async revealVotes() {
    const { error } = await this.supabaseService.revealVotes(this.roomId);
    if (error) {
      console.error('Error revelando votos:', error);
    }
  }

  async resetVotes() {
    const { error } = await this.supabaseService.resetVotes(this.roomId);
    if (error) {
      console.error('Error reiniciando votos:', error);
    }
  }
}
