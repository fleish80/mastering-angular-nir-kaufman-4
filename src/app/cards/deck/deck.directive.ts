import { Directive, Input, ViewContainerRef, Renderer2, ComponentFactoryResolver, Injector, ElementRef, OnInit, ComponentRef, TemplateRef } from '@angular/core';
import { Card, CardTypes, CardTemplateContext } from '../cards.types';
import { CardTemplatesComponent } from '../card-templates/card-templates.component';

@Directive({
  selector: '[appDeck]'
})
export class DeckDirective implements OnInit{

  @Input('appDeckFor') cards: Card[];
  @Input('appDeckPrimary') primaryTemplate: TemplateRef<CardTemplateContext>

  constructor(
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private hostElement: ElementRef
  ) { }

  ngOnInit(): void {
    console.log('this.cards', this.cards);
    const parentNode = this.renderer.parentNode(this.hostElement.nativeElement);
    const wrapper = this.renderer.createElement('div');
    this.renderer.addClass(wrapper, 'card-deck');
    this.renderer.insertBefore(parentNode, wrapper, this.hostElement.nativeElement);
    this.renderer.removeChild(parentNode, this.hostElement.nativeElement);
    this.renderer.appendChild(wrapper, this.hostElement.nativeElement);

    // create CardTemplateComponent
    const cardTemplateFactory = this.componentFactoryResolver.resolveComponentFactory<CardTemplatesComponent>(CardTemplatesComponent);
    const cardTemplatesComponent: ComponentRef<CardTemplatesComponent> = cardTemplateFactory.create(this.injector);

    this.cards.forEach((card: Card) => {
      this.rendererTemplate(card, cardTemplatesComponent);
    })
  }

  private rendererTemplate(card: Card, templateComponent: ComponentRef<CardTemplatesComponent>) {
    switch (card.type) {
      case CardTypes.Plain:
       this.viewContainer.createEmbeddedView( this.primaryTemplate || templateComponent.instance.plaintCardTemplate, {$implicit: card})
        break;
      case CardTypes.Primary:
        this.viewContainer.createEmbeddedView(templateComponent.instance.primaryCardTemplate, {$implicit: card})
        break;
    }
  }

}
