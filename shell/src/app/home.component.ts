import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  TonButtonDirective,
  TonCardContentDirective,
  TonCardDescriptionDirective,
  TonCardDirective,
  TonCardHeaderDirective,
  TonCardTitleDirective,
} from '@tony-ui/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    TonButtonDirective,
    TonCardContentDirective,
    TonCardDescriptionDirective,
    TonCardDirective,
    TonCardHeaderDirective,
    TonCardTitleDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly docsUrl = environment.docsUrl;
}
