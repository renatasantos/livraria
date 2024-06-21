import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {
  PoTableAction,
  PoFilterMode,
  PoComboOption,
  PoNotificationService,
  PoToasterOrientation,
} from '@po-ui/ng-components';
import { BookService } from 'src/app/services/book.service';
import { AuthorService } from 'src/app/services/author.service';
import { Autor } from '../author/author.component';
import { UntypedFormBuilder, Validators } from '@angular/forms';

interface Books {
  _id: string;
  titulo: string;
  dataPublicacao: Date | null;
  autor: Autor;
  editora: string;
  observacao: string;
  dataInclusao: Date | null;
  estaDisponivel: boolean;
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BookComponent implements OnInit {
  authorList: PoComboOption[] = [];
  booksList: Books[] = [];
  titulo: string = '';
  autor: string = '';
  editora: string = '';
  observacao?: string = '';
  editId: string | null = null;
  dataPublicacao: Date | null = null;
  dataInclusao: Date | null = null;
  estaDisponivel: number | null = null;
  filterMode: PoFilterMode = PoFilterMode.contains;
  columns = [
    { property: '_id', label: 'Código', visible: false },
    { property: 'titulo', label: 'Título' },
    { property: 'dataPublicacao', label: 'Data de Publicação', type: 'date' },
    { property: 'dataInclusao', label: 'Data da Inclusão', type: 'date' },
    { property: 'autor.nome', label: 'Autor' },
    { property: 'editora', label: 'Editora' },
    { property: 'estaDisponivel', label: 'Está Disponível', type: 'boolean' },
    { property: 'observacao', label: 'Observações', visible: false },
  ];

  actions: PoTableAction[] = [
    {
      label: 'Editar',
      action: this.fillForm.bind(this),
      icon: 'po-icon-edit',
    },
    {
      label: 'Excluir',
      action: this.deleteUser.bind(this),
      icon: 'po-icon-delete',
    },
  ];

  formGroup = this.fb.group({
    titulo: [this.titulo, [Validators.required]], // Campo obrigatório
    autor: [this.autor, [Validators.required]], // Campo obrigatório
    editora: [this.editora, [Validators.required]], // Campo obrigatório
    observacao: [this.observacao, []], // Campo não obrigatório
    dataPublicacao: [this.dataPublicacao, []], // Campo não obrigatório
    dataInclusao: [this.dataInclusao, []], // Campo não obrigatório
    estaDisponivel: [this.estaDisponivel, []], // Campo não obrigatório
  });

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private poNotification: PoNotificationService,
    private fb: UntypedFormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadBooksList();
    await this.loadAuthorList();
  }

  async saveBook(): Promise<void> {
    if (!this.validateForm()) {
      return;
    }
    
    if (this.editId) {
      await this.EditedBook();
      this.poNotification.success({
        message: 'Livro editado com sucesso!',
        orientation: PoToasterOrientation.Top,
      });
    } else {
      await this.createBook();
      this.poNotification.success({
        message: 'Livro adicionado com sucesso!',
        orientation: PoToasterOrientation.Top,
      });
    }
    this.clearForm();
    await this.loadBooksList();
  }

  validateForm() {
    if (this.formGroup.invalid) {
      this.poNotification.warning({
        message: 'Preencha todos os campos obrigatórios!',
        orientation: PoToasterOrientation.Top,
      });
      return false;
    }
    return true;
  }

  private async EditedBook() {
    const form = this.formGroup.value;
    await this.bookService.edit({
      _id: this.editId,
      titulo: form.titulo,
      autor: form.autor,
      editora: form.editora,
      observacao: form.observacao,
      dataPublicacao: form.dataPublicacao,
      dataInclusao: form.dataInclusao,
      estaDisponivel: this.handleEstaDisponivel(),
    });
  }

  private async createBook() {
    const form = this.formGroup.value;
    await this.bookService.create({
      titulo: form.titulo,
      autor: form.autor,
      editora: form.editora,
      observacao: form.observacao,
      dataPublicacao: form.dataPublicacao,
      dataInclusao: form.dataInclusao,
      estaDisponivel: this.handleEstaDisponivel(),
    });
  }

  async deleteUser(book: Books): Promise<void> {
    await this.bookService.delete(book._id);
    this.poNotification.success({
      message: 'Livro excluído com sucesso!',
      orientation: PoToasterOrientation.Top,
    });
    await this.loadBooksList();
  }

  async fillForm(book: Books): Promise<void> {
    this.editId = book._id;
    this.formGroup.patchValue({
      titulo: book.titulo,
      autor: book.autor._id,
      editora: book.editora,
      observacao: book.observacao,
      dataPublicacao: book.dataPublicacao
        ? new Date(book.dataPublicacao)
        : null,
      dataInclusao: book.dataInclusao ? new Date(book.dataInclusao) : null,
      estaDisponivel: book.estaDisponivel ? 1 : 2,
    });
  }

  cancel(): void {
    this.clearForm();
  }

  private clearForm() {
    this.formGroup.reset();
    this.editId = null;
  }

  private async loadBooksList() {
    await this.bookService.getAll().then((books) => {
      this.booksList = books as Books[];
    });
  }

  private async loadAuthorList() {
    await this.authorService.getAll().then((autores) => {
      const authorList = autores as Autor[];
      this.authorList = authorList.map((author) => {
        return { label: author.nome, value: author._id };
      });
    });
  }

  private handleEstaDisponivel() {
    if (this.formGroup.value.estaDisponivel === 1) {
      return true;
    } else if (this.formGroup.value.estaDisponivel === 2) {
      return false;
    } else {
      return null;
    }
  }
}
