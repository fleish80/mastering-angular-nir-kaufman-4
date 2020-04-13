import { Component } from '@angular/core';
import { Card, CardTypes } from './cards/cards.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cards: Card[] = [
    {
      type: CardTypes.Plain,
      title: 'The title',
      text: 'The text to render',
    },
    {
      type: CardTypes.Plain,
      title: 'Another title',
      text: 'Another text to render',
    },
    {
      type: CardTypes.Primary,
      title: 'What else',
      text: 'the text the text',
      header: 'The header',
      smallText: 'small text'
    },
  ];
}
