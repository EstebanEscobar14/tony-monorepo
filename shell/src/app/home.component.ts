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
export class HomeComponent {}
