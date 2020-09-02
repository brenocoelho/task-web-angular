import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTag]'
})
export class TagDirective {

  @Input() highlightColor: string;

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || '#FF1493');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }  

}
