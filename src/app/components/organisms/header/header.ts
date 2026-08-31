import { Component, input, signal } from '@angular/core';
import { Button } from '../../atoms/button/button';
import { Avatar } from '../../atoms/avatar/avatar';
import { Modal } from '../../molecules/modal/modal';
import { Input } from '../../atoms/input/input';

@Component({
  selector: 'app-header',
  imports: [Button, Avatar, Modal, Input],
  templateUrl: './header.html',
})
export class Header {
  showItems = input(false);
  title = input('');
  playerName = input('');
  showModal = signal(false);
  shareUrl = signal('');

  copyText() {
    navigator.clipboard.writeText(this.shareUrl());
  }

  constructor() {
    this.shareUrl.set(location.href);
  }
}
