import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'greet',
  templateUrl: './greet.component.html',
  styleUrls: ['./greet.component.scss'],
  host: {
    class: 'greet-container',
  },
})
export class GreetComponent {
  @Input() user!: User;
  @Output() hello = new EventEmitter();

  onSayHello() {
    this.hello.emit('hello from greet');
  }
}
