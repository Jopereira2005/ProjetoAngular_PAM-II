import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage {
  constructor() {
    this.getData()
  }
  getData() {
    fetch('/api/usuario/listar-todos')
    .then(T => T.json())
    .then(console.log);
    
  }
}