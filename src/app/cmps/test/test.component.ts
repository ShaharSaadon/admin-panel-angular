import { Component } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  title = 'registration';
  pets: Pet[] = [
    { name: 'Rexi', _id: '100' },
    { name: 'bracha', _id: '101' },
  ];
  user: User = {
    name: 'shahar',
    age: 37,
    isAdmin: true,
  };
  onToggleAdmin(ev: MouseEvent) {
    console.log('hello');
    this.user.balance = 100;
    this.user.isAdmin = !this.user.isAdmin;
  }
  onAddPet() {
    this.pets.push({ name: 'rara', _id: '102' });
  }
  onSayHello(msg: string) {
    console.log('msg:', msg);
  }
  trackByFn(idx: number, pet: Pet) {
    return pet._id;
  }
}
