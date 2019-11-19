import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  backgroundColor: string;
  idForm: number = 0;
  idDelete: number;
  modalRef: BsModalRef;
  confirm: string;
  constructor(private modalService: BsModalService) { }

  addContato = new FormGroup({
    id: new FormControl(''),
    cor: new FormControl(''),
    nome: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    controle: new FormControl('')
  })
  contatos = [
    { id: 0, cor: "#53CD86", nome: "000", telefone: "(11) 1-1111", email: "asdasdasdasd", controle: '' },
    { id: 1, cor: "#53CD86", nome: "111", telefone: "(11) 1-1111", email: "asdasdasdasd", controle: '' },
    { id: 2, cor: "#53CD86", nome: "222", telefone: "(11) 1-1111", email: "asdasdasdasd", controle: '' }
  ]

  pesquisar = new FormGroup({
    barraDePesquisa: new FormControl('')
  })

  search() {
  }

  openModalAdd(modalAddCtt: TemplateRef<any>) {
    this.modalRef = this.modalService.show(modalAddCtt);
  }

  saveContact(contato) {
    let hexadecimais = '0123456789ABCDEF';
    let cor = '#';

    // Pega um número aleatório no array acima
    for (let i = 0; i < 6; i++) {
      //E concatena à variável cor
      cor += hexadecimais[Math.floor(Math.random() * 16)];
      this.backgroundColor = cor;
    }

    let dados = {
      id: this.idForm++,
      cor: this.backgroundColor,
      nome: contato.nome,
      telefone: contato.telefone,
      email: contato.email,
      controle: ''
    }
    this.contatos.push(dados);
    this.addContato.reset();
  }

  mascara(v) {
    let telefone: any = document.getElementById('telefone');
    v = v.replace(/\D/g, "");             //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    telefone.value = v;
  }

  edit(contato, modalEditCtt: TemplateRef<any>) {
    console.log(contato);
    this.modalRef = this.modalService.show(modalEditCtt);
    this.addContato.setValue({
      id: contato.id,
      cor: contato.cor,
      nome: contato.nome,
      telefone: contato.telefone,
      email: contato.email,
      controle: contato.controle
    })
  }

  delete(contato, modalDeleteCtt: TemplateRef<any>) {
    this.idDelete = contato.id;
    this.modalRef = this.modalService.show(modalDeleteCtt);
  }

  saveEdit(contato) {
    this.contatos[contato.id] = contato;
    this.addContato.reset();
  }

  confirmDelete() {

    for( var i = 0; i < this.contatos.length; i++){ 
      if ( this.contatos[i].id === this.idDelete) {
        this.contatos.splice(i, 1); 
      }
   }
    this.modalRef.hide();
  }
}
