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

  numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  sinais = ["/", "*", "-", "+"]
  calculo: string = "";
  calculoA: string = "";
  resultado!: string;

  adicionarCalculo(n: string) {
    let calcArray = []
    calcArray = this.calculo.split("").reverse()

     if (n == ".") {
      this.calculo += this.ponto(n) 
    } else if (n == "%") {
      this.porcentagem()
    } else if (this.sinais.includes(n) == true){
      if (this.sinais.includes(calcArray[1]) == true) {
        calcArray.splice(0, 3)
        this.calculo = calcArray.reverse().join('')
        this.calculo += `,${n},`;
      } else if (this.calculo == ""){
      } else {
        this.calculo += `,${n},`;
      } 
    } else {
      this.calculo += n;
    }
    this.atualizarAparencia()
  }

  calcular() {
    //cria uma string sem , para o eval dar certo
    let calculoF = this.calculo.split(',')
    this.resultado = eval(calculoF.join(''))
    this.atualizarAparencia()
  }

  c() {
    this.calculo = ''
    this.resultado = ''
    this.atualizarAparencia()
  }

  del() {
    this.resultado = ''
    let calcArray = []
    let calcArrayI = []

    calcArray = this.calculo.split('').reverse()
    calcArrayI = this.calculo.split(',').reverse()

     // variavel auxilizar criada para ajudar nas verificações
    let auxiliar = calcArrayI[0]
    if (calcArray[0] == ")") {
      calcArrayI.splice(0, 1, "")
      this.calculo = calcArrayI.reverse().join()
    } else if (this.sinais.includes(calcArrayI[1]) == true && this.numeros.includes(auxiliar[0]) == false) {
      if (auxiliar[0] == "(") {
        calcArrayI.splice(0, 1, "")
      } else {
        calcArrayI.splice(0, 2)
      }
      this.calculo = calcArrayI.reverse().join()
    } else {

      calcArray.shift()
      this.calculo = calcArray.reverse().join("")
    }
    this.atualizarAparencia()

  }

  mais_menos() {
    // cria e inverte o array, para ser mais facil o uso e separa os sinais e numeros
    let calcArray = []
    calcArray = this.calculo.split(",").reverse()
    let auxiliar = calcArray[0]
    console.log(auxiliar)
    console.log(calcArray)
    if(auxiliar == "" || auxiliar == ".") {

    } else if (calcArray[0] == ")") {
    } else if (auxiliar[0] == "(") {
    } else if (this.sinais.includes(calcArray[1]) == true && this.numeros.includes(auxiliar[0]) == false) {
      console.log(calcArray)
      this.calculo = calcArray.reverse().join()
    } else if (this.numeros.includes(auxiliar[0]) == true) {
      if (calcArray[1] == ".") {
        console.log(calcArray)  
        calcArray.splice(0, 3, `(-${calcArray[2]}.${calcArray[0]})`)
        this.calculo = calcArray.reverse().join()
      } else {
        console.log(calcArray)
      calcArray[0] = `(-${calcArray[0]})`
      this.calculo = calcArray.reverse().join()
      }
    } else{
      console.log(calcArray)
      calcArray[0] = `(-${calcArray[0]})`
      this.calculo = calcArray.reverse().join()
    }
    this.atualizarAparencia()
  }
  ponto(ponto: string) {
    ponto = `,${ponto},`
    // cria e inverte o array, para ser mais facil o uso e separa os sinais e numeros
    let calcArray = []
    calcArray = this.calculo.split(",").reverse()

    // variaveis auxilizar criada para ajudar nas verificações
    let auxiliar = calcArray[0]
    let auxiliar2 = calcArray[0].split("").reverse()

    console.log(auxiliar2[0], auxiliar2[1])
    // verifica se o primeiro valor é um sinal, se for, vai ser colocado na expressão 0., ex: 1+0.
    if (this.sinais.includes(calcArray[1]) == true && calcArray[0] == "") {
      ponto = "0,.,"
    // verifica se há %
    } else if (auxiliar2[0] == "%") {
      ponto = ",*,0,.,"
    // verifica se há % e )
    } else if (auxiliar2[0] == ")" && auxiliar2[1] == "%") {
      ponto = ",*,0,.,"
    // verifica se há repeticção do for ., ou ) do mais ou menos, ou se a repetição do ponto e
    } else if (calcArray[1] == "." || auxiliar[0] == "(" || this.calculo == "") {
      ponto = ""
    }
    this.atualizarAparencia()
    return ponto
  }

  atualizarAparencia() {
    this.calculoA = this.calculo.split(",").join("")
  }

  porcentagem () {
    // cria e inverte o array, para ser mais facil o uso e separa os sinais e numeros
    let calcArray = []
    calcArray = this.calculo.split(",").reverse()
    // variavel auxiliar para ajudar nas verficações
    let auxiliar = calcArray[0].split("").reverse()
    let auxiliar2 = calcArray[0]
    
    // vererifica porcentagem repetido, ) do mais ou menos e se o calculo estiver vazio
    if(auxiliar[0] == "%" || auxiliar[0] == ")" || this.calculo == "") {
    } else if (auxiliar2 == "" || auxiliar2 == ".") {

    }else {
      calcArray[0] = `(${calcArray[0]}/100)`
      this.calculo = calcArray.reverse().join()
    }

  }
}

