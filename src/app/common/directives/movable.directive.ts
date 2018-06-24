import { Directive, HostListener, HostBinding } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

interface Position {
  x: number,
  y: number,
}

@Directive({
  selector: '[movable]'
})
export class MovableDirective extends DraggableDirective {
  private position: Position = { x: 0, y: 0 };
  private startPosition: Position = { x: 0, y: 0 };

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`translateX(${this.position.x}) translateY(${this.position.y})`);
  }

  @HostListener('dragStart', ['$event']) onDragStart(event: PointerEvent) {
    this.startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    }
  }

  @HostListener('dragMove', ['$event']) onDragMove(event: PointerEvent) {
    this.position.x = event.clientX - this.startPosition.x;
    this.position.y = event.clientY - this.startPosition.y;
  }

  // @HostListener('dragEnd', ['$event ']) onDragEnd(event: PointerEvent) {
  //   console.log('yes');
  // }

}