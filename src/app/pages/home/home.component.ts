import { Component } from '@angular/core';
import { PoMenuItem, PoMenuPanelItem } from '@po-ui/ng-components';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  title: string = 'Customers';
  menuId: number = 0;
  readonly menus: Array<PoMenuItem> = [
    {
      label: 'Home',
      action: this.changeTitle.bind(this),
      icon: 'po-icon-home',
    },
    {
      label: 'Cadastro de Autores',
      action: this.changeTitle.bind(this),
      icon: 'po-icon-plus'
    },
    {
      label: 'Cadastro Livros',
      action: this.changeTitle.bind(this),
      icon: 'po-icon-plus'
    },
    {
      label: 'Cadastro de Usuários',
      action: this.changeTitle.bind(this),
      icon: 'po-icon-user'
    },
    {
      label: 'Sobre',
      action: this.changeTitle.bind(this),
      icon: 'po-icon-info',
    },
    {
      label: 'Primeiros Passos',
      action: this.changeTitle.bind(this),
      icon: 'po-icon-eye'
    },
    {
      label: 'Sair',
      action: this.logout.bind(this),
      icon: 'po-icon-exit'
    }

  ];

  changeTitle(menu: PoMenuPanelItem) {
    this.title = menu.label;
    switch (menu.label) {
      case 'Cadastro de Autores':
        this.menuId = 1;
        break;
      case 'Cadastro Livros':
        this.menuId = 2;
        break;     
      case 'Cadastro de Usuários':
          this.menuId = 3;
          break;
      case 'Sobre':
        this.menuId = 4;
        break;
      case 'Primeiros Passos':
        this.menuId = 5;
        break;
      case 'Sair':
        this.menuId = 6;
        break;
      default:
        this.menuId = 0;
        break;
    }
  }

  changeMenuId(menuId: number){
    this.menuId = menuId;
  }

  logout() {    
    this.title = 'Customers';
    this.menuId = 0;

    window.location.href = '/login';;
  }

}