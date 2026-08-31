import { Injectable } from '@angular/core';
import {
  createClient,
  RealtimePostgresChangesPayload,
  SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { Player, Room } from '../app/pages/room/room';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  async createRoom(roomName: string) {
    const { data, error } = await this.supabase
      .from('rooms')
      .insert({ name: roomName })
      .select()
      .single();

    return { data, error };
  }

  async addPlayerToRoom(roomId: string, playerName: string, role: string) {
    const { data, error } = await this.supabase
      .from('players')
      .insert({ room_id: roomId, name: playerName, role })
      .select()
      .single();

    return { data, error };
  }

  async getRoom(roomId: string) {
    const { data, error } = await this.supabase.from('rooms').select('*').eq('id', roomId).single();

    return { data, error };
  }

  async setAdmin(roomId: string, playerId: string) {
    const { data, error } = await this.supabase
      .from('rooms')
      .update({ admin_id: playerId })
      .eq('id', roomId)
      .select()
      .single();

    return { data, error };
  }

  subscribeToRoom(
    roomId: string,
    callbacks: {
      onPlayerChange: (payload: RealtimePostgresChangesPayload<Player>) => void;
      onRoomChange: (payload: RealtimePostgresChangesPayload<Room>) => void;
    },
  ) {
    return this.supabase
      .channel(`room-${roomId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'players', filter: `room_id=eq.${roomId}` },
        callbacks.onPlayerChange,
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'rooms', filter: `id=eq.${roomId}` },
        callbacks.onRoomChange,
      )
      .subscribe();
  }

  unsubscribe(roomId: string) {
    this.supabase.channel(`room-${roomId}`).unsubscribe();
  }

  async getPlayers(roomId: string) {
    const { data, error } = await this.supabase.from('players').select('*').eq('room_id', roomId);

    return { data, error };
  }

  async vote(playerId: string, value: string) {
    const { data, error } = await this.supabase
      .from('players')
      .update({ vote: value })
      .eq('id', playerId)
      .select()
      .single();

    return { data, error };
  }

  async revealVotes(roomId: string) {
    const { data, error } = await this.supabase
      .from('rooms')
      .update({ status: 'revealed' })
      .eq('id', roomId)
      .select()
      .single();

    return { data, error };
  }

  async resetVotes(roomId: string) {
    const { error } = await this.supabase
      .from('players')
      .update({ vote: null })
      .eq('room_id', roomId);

    if (error) {
      return { data: null, error };
    }

    const { data: roomData, error: roomError } = await this.supabase
      .from('rooms')
      .update({ status: 'voting' })
      .eq('id', roomId)
      .select()
      .single();

    return { data: roomData, error: roomError };
  }

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }
}
