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

  sinais = ["/", "*", "-", "+"]
  calculo: string = '';
  resultado!: string;

  adicionarCalculo(n: string) {
    if (n === "="){
      this.calcular()
    }  else if (n == '.') {
      this.calculo += this.ponto(n) 
    } else if (this.sinais.includes(n) == true){
      let calcArray = []
      calcArray = this.calculo.split("").reverse()
      if (this.sinais.includes(calcArray[1]) == true) {
        calcArray.splice(0, 3)
        this.calculo = calcArray.reverse().join('')
        this.calculo += `,${n},`;
      } else {
        this.calculo += `,${n},`;
      }
    } else {
      this.calculo += n;
    }  
  }

  calcular() {
    let calculoF = this.calculo.split(',')
    this.calculo = calculoF.join('')
    this.resultado = eval(this.calculo)
  }

  c() {
    this.calculo = '' 
    this.resultado = ''
  }

  del() {
    this.resultado = ''
    let calcArray = []
    calcArray = this.calculo.split('').reverse()
    if (this.sinais.includes(calcArray[1]) == true) {
      calcArray.splice(0, 3)
    } else
    calcArray.shift()
    this.calculo = calcArray.reverse().join('')
  }

  mais_menos() {
    let calcArray = []
    calcArray = this.calculo.split(",").reverse()
    console.log(calcArray.reverse())
    if (calcArray[0] != ',') {
      calcArray[0] = `(-${calcArray[0]})`
      this.calculo = calcArray.reverse().join()
    } else {
      this.calculo = calcArray.reverse().join()
    }

  }

  ponto(valor: string) {
    let calcArray = []
    calcArray = this.calculo.split("").reverse()
    if (calcArray[0] == ',') {
      valor = "0."
    } else if (calcArray[0] == "." || calcArray[0] == ')' || calcArray[1] == '.') {
      valor = ""
    }
    return valor
  }
}