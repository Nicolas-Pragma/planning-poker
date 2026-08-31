import { Component, computed, input, output, signal } from '@angular/core';
import { Card } from '../../atoms/card/card';
import { Button } from '../../atoms/button/button';
import { Avatar } from '../../atoms/avatar/avatar';
import { Player } from '../../../pages/room/room';

@Component({
  selector: 'app-table',
  imports: [Card, Button, Avatar],
  templateUrl: './table.html',
})
export class Table {
  protected tablePositions = [
    'absolute bottom-0 left-1/2 -translate-x-1/2',
    'absolute top-0 left-1/2 -translate-x-1/2',
    'absolute left-0 top-1/2 -translate-y-1/2',
    'absolute right-0 top-1/2 -translate-y-1/2',
    'absolute left-1/5 top-0',
    'absolute right-1/5 top-0',
    'absolute left-1/5 bottom-0',
    'absolute right-1/5 bottom-0',
  ];

  meId = input('');
  players = input(<Player[]>[]);
  revealCards = output();
  resetVotes = output();
  roomIdAdmin = input('');
  roomStatus = input<'voting' | 'revealed'>('voting');

  orderedPlayers = computed(() => {
    const all = this.players();
    const myIndex = all.findIndex((p) => p.id === this.meId());
    if (myIndex <= 0) return all;
    return [...all.slice(myIndex), ...all.slice(0, myIndex)];
  });
}
