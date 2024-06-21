import { Component, OnInit } from '@angular/core';
import { PoTableAction, PoFilterMode, PoNotificationService, PoToasterOrientation } from '@po-ui/ng-components';
import { UserService } from 'src/app/services/user.service';

interface User {
  _id: string;
  nome: string;
  cpf: string;
  dataNascimento: Date;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  usersList: User[] = [];
  nome: string = '';
  cpf: string = '';
  editId: string | null = null;
  dataNascimento: Date | null = null;
  filterMode:PoFilterMode = PoFilterMode.contains; 
  columns = [
    { property: '_id', label: 'Código', visible: false},
    { property: 'nome', label: 'Nome Usuário' },
    { property: 'cpf', label: 'CPF' },
    { property: 'dataNascimento', label: 'Data de nascimento', type: 'date' },
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

  constructor(private userService: UserService, private poNotification: PoNotificationService ) {}
  async ngOnInit(): Promise<void> {
    await this.loadUsersList();
  }
  async saveUser(): Promise<void> {
    if (this.editId) {
      await this.EditedUser();
      this.poNotification.success({
        message: 'Usuário editado com sucesso!',
        orientation: PoToasterOrientation.Top,     
      });   
      
    } else {
      await this.createUser();
      this.poNotification.success({
        message: 'Usuário adicionado com sucesso!',
        orientation: PoToasterOrientation.Top,     
      });   
    }
    this.clearForm();
    await this.loadUsersList();
  }
  private async EditedUser() {
    await this.userService.edit({
      _id: this.editId,
      nome: this.nome,
      cpf: this.cpf,
      dataNascimento: this.dataNascimento,
    });
  }

  private async createUser() {
    await this.userService.create({
      nome: this.nome,
      cpf: this.cpf,
      dataNascimento: this.dataNascimento,
    });
  }

  async deleteUser(user: User): Promise<void> {
    await this.userService.delete(user._id);
    this.poNotification.success({
      message: 'Usuário deletado com sucesso!',
      orientation: PoToasterOrientation.Top,     
    });   
    await this.loadUsersList();
  }

  async fillForm(user: User): Promise<void> {
    this.editId = user._id;
    this.nome = user.nome;
    this.cpf = user.cpf;
    this.dataNascimento = new Date(user.dataNascimento);
  }

  cancel(): void {
    this.clearForm();
  }

  private async loadUsersList() {
    await this.userService.getAll().then((users) => {
      this.usersList = users as User[];
    });
  }

  private clearForm() {
    this.nome = '';
    this.cpf = '';
    this.dataNascimento = null;
    this.editId = null;
  }

  get isFormValid(): boolean {
    return !!this.nome && !!this.cpf && !!this.dataNascimento;
  }
}
