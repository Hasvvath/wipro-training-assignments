import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class Highlight implements OnInit {

  @Input() appHighlight: number = 0;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.appHighlight > 2000) {
      this.el.nativeElement.style.backgroundColor = '#FFD700';
    }
  }
}