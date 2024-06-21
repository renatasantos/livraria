import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { PoModalComponent } from '@po-ui/ng-components';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent implements OnInit {
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
  @Output()changeMenuId=new EventEmitter < number > ();

  help: string | undefined;
  label: string | undefined;
  value: string | undefined;

  constructor(private router: Router) { }

  ngOnInit() { }

  showAuthor() {
    this.changeMenuId.emit(1);
  }

  showBook() {
    this.changeMenuId.emit(2);
  }

  showUser() {
    this.changeMenuId.emit(3);
  }

  showAbout() {
    this.changeMenuId.emit(4);
  }

  showJavascriptTechnologies() {
    this.poModal.open();
  }  
}
