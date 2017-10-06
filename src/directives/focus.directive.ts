import {Directive, ElementRef} from "@angular/core";

@Directive({
  selector: '[focusMe]'
})
export class FocusDirective {
  constructor(private el: ElementRef) {}
  ngAfterViewInit() {
    this.el.nativeElement.children[0].focus();
  }
}
