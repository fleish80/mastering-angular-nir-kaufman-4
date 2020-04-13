import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CardTemplateContext } from '../cards.types';

@Component({
  templateUrl: './card-templates.component.html',
  styleUrls: ['./card-templates.component.scss']
})
export class CardTemplatesComponent {

  @ViewChild('plainCard', {static: true}) plaintCardTemplate: TemplateRef<CardTemplateContext>;
  @ViewChild('primaryCard', {static: true}) primaryCardTemplate: TemplateRef<CardTemplateContext>;

  constructor() { }
 

}
