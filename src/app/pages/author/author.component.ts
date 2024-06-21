import { Component, OnInit } from '@angular/core';
import {
  PoFilterMode,
  PoNotificationService,
  PoToasterOrientation,
} from '@po-ui/ng-components';
import { AuthorService } from 'src/app/services/author.service';

export interface Autor {
  _id: string;
  nome: string;
  nacionalidade: string;
}

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
})
export class AuthorComponent implements OnInit {
  authorList: Autor[] = [];
  nome: string = '';
  nacionalidade: string = '';
  editId: string | null = null;
  filterMode: PoFilterMode = PoFilterMode.contains;
  columns = [
    { property: '_id', label: 'Código', visible: false },
    { property: 'nome', label: 'Nome Autor' },
    { property: 'nacionalidade', label: 'Nacionalidade' },
  ];

  actions = [
    {
      label: 'Editar',
      action: this.fillForm.bind(this),
      icon: 'po-icon-edit',    
    },
    {
      label: 'Excluir',
      action: this.deleteAuthor.bind(this),
      icon: 'po-icon-delete',
    },
  ];

  constructor(
    private authorService: AuthorService,
    private poNotification: PoNotificationService
  ) {}
  async ngOnInit(): Promise<void> {
    await this.loadAuthorList();
  }

  async saveAuthor(): Promise<void> {
    if (this.editId) {
      await this.editedAuthor();
      this.poNotification.success({
        message: 'Autor editado com sucesso!',
        orientation: PoToasterOrientation.Top,     
      });   
    } else {
      await this.createAuthor();
      this.poNotification.success({
        message: 'Autor adicionado com sucesso!',
        orientation: PoToasterOrientation.Top,     
      });   
    }
    this.clearForm();
    await this.loadAuthorList();
  }

  private async editedAuthor() {
    await this.authorService.edit({
      _id: this.editId,
      nome: this.nome,
      nacionalidade: this.nacionalidade,
    });
  }

  private async createAuthor() {
    await this.authorService.create({
      nome: this.nome,
      nacionalidade: this.nacionalidade,
    });
  }

  private async deleteAuthor(author: Autor) {
    await this.authorService.delete(author._id);
    this.poNotification.success({
      message: 'Autor excluído com sucesso!',
      orientation: PoToasterOrientation.Top,     
    });    
    await this.loadAuthorList();
  }

  private fillForm(author: Autor) {
    this.nome = author.nome;
    this.nacionalidade = author.nacionalidade;
    this.editId = author._id;
  }

  cancel(): void {
    this.clearForm();
  }

  private clearForm() {
    this.nome = '';
    this.nacionalidade = '';
    this.editId = null;
  }

  private async loadAuthorList() {
    await this.authorService.getAll().then((autores) => {
      this.authorList = autores as Autor[];
    });
  }

  get isFormValid(): boolean {
    return !!this.nome && !!this.nacionalidade;
  }
 
}
