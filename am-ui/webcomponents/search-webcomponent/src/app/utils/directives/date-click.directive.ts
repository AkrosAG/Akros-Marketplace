import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[mpDateClick]'
})
export class DateClickDirective {
  @HostListener('focus') onMouseFocus() {
    this.el.nativeElement.type = 'date';
    setTimeout(()=>{this.el.nativeElement.click()},2);
    setTimeout(()=>{this.el.nativeElement.click()},15);
  }

  @HostListener('blur') onMouseBlur() {
    if(this.el.nativeElement.value == ""){
      this.el.nativeElement.type = 'text';
    }
  }

  constructor(private el:ElementRef) { }

}
