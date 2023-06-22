import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  constructor() {}

  calculo: string = '';
  resultado!: string;

  adicionarCalculo(n: string) {

    this.calculo += n;
  
    if(n == "="){
      this.resultado = this.calculo
      // this.resultado = eval(this.calculo)
    }
    
  }

}
