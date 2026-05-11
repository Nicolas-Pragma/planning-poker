import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

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

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }
}
