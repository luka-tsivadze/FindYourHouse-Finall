import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';

@Component({
  selector: 'app-schedule-r',
  templateUrl: './schedule-r.component.html',
  styleUrl: './schedule-r.component.scss'
})
export class ScheduleRComponent {

  @ViewChild('circle', { static: true }) circle!: ElementRef;
  @ViewChild('circle2', { static: true }) circle2!: ElementRef;

  centerX = 0;
  centerY = 0;

  am = true;
  timeH = true;
  Hour = new Date().getHours() % 12 || 12;
  minutes = new Date().getMinutes();
  defoultcircle!: HTMLElement;
  defoultcircle2!: HTMLElement;

  isDraggingOuter = false;
  currentAngleOuter = 30 * this.Hour - 90;
  startAngleOuter = 0;
  i = 0;
  index = 0;

  isDraggingOuter2 = false;
  currentAngleOuter2 = 6 * this.minutes - 90;
  startAngleOuter2 = 0;
  settime = new Date().getHours() >= 12 ? 'PM' : 'AM';
 
  showClock= false;

  private isBrowser = typeof document !== 'undefined';

  staticData={
    header:'Schedule a Tour',
    ad:'Adult',
    ch:'Children',
    submit:'Submit'
  }

  constructor(private renderer: Renderer2 ,private lang:LanguageChooserService) {
    this.staticData=this.lang.chosenLang.DetailedInfo.scheduled;//for language
    if (this.isBrowser) {
      this.renderer.listen('document', 'mousemove', this.onMouseMove.bind(this));
      this.renderer.listen('document', 'mouseup', this.onMouseUp.bind(this));
    }
  }
changeValue(el){
  el=!el;
this.showClock=el;
}
  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.defoultcircle = this.circle.nativeElement as HTMLElement;
    this.renderer.setStyle(
      this.defoultcircle,
      'transform',
      `rotate(${this.Hour * 30 - 90}deg)`
    );

    this.defoultcircle2 = this.circle2.nativeElement as HTMLElement;
    this.renderer.setStyle(
      this.defoultcircle2,
      'transform',
      `rotate(${this.minutes * 6 - 90}deg)`
    );
  }

  onMouseDown(event: MouseEvent, circleType: 'outer' | 'outer2'): void {
    if (!this.isBrowser) return;

    if (circleType === 'outer') {
      this.isDraggingOuter = true;
      const rect = this.circle.nativeElement.getBoundingClientRect();
      this.centerX = rect.left + rect.width / 2;
      this.centerY = rect.top + rect.height / 2;
      this.startAngleOuter = this.calculateAngle(event.clientX, event.clientY);
    } else if (circleType === 'outer2') {
      this.isDraggingOuter2 = true;
      const rect = this.circle2.nativeElement.getBoundingClientRect();
      this.centerX = rect.left + rect.width / 2;
      this.centerY = rect.top + rect.height / 2;
      this.startAngleOuter2 = this.calculateAngle(event.clientX, event.clientY);
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isBrowser) return;

    if (this.isDraggingOuter) {
      const currentMouseAngle = this.calculateAngle(event.clientX, event.clientY);
      const angleDifference = currentMouseAngle - this.startAngleOuter;
      this.currentAngleOuter += angleDifference;
      this.startAngleOuter = currentMouseAngle;

      this.renderer.setStyle(
        this.circle.nativeElement,
        'transform',
        `rotate(${this.currentAngleOuter}deg)`
      );

      if (this.currentAngleOuter < 0) {
        this.Hour = Math.round(12 + this.currentAngleOuter / 30);
      } else {
        this.Hour = Math.round(this.currentAngleOuter / 30);
      }

      this.Hour = this.Hour + 3;

      if (this.Hour > 12) {
        this.Hour = this.Hour - 12;               //need to change later
        this.index = 0;
      }
      if (this.Hour === 12 && this.index === 0) {
        this.index++;
        if (this.i % 2 === 0) {
          this.i++;
          this.settime = 'AM';
        } else if (this.i % 2 === 1) {
          this.i++;
          this.settime = 'PM';
        }
      }
    }

    if (this.isDraggingOuter2) {
      const currentMouseAngle = this.calculateAngle(event.clientX, event.clientY);
      const angleDifference = currentMouseAngle - this.startAngleOuter2;
      this.currentAngleOuter2 += angleDifference;
      this.startAngleOuter2 = currentMouseAngle;

      if (this.currentAngleOuter2 < 0) {
        this.minutes = Math.round(60 + this.currentAngleOuter2 / 6);
      } else {
        this.minutes = Math.round(this.currentAngleOuter2 / 6);
      }
      this.minutes = this.minutes + 15;
      if (this.minutes >= 59) {
        this.minutes = this.minutes - 59;
      }

      this.renderer.setStyle(
        this.circle2.nativeElement,
        'transform',
        `rotate(${this.currentAngleOuter2}deg)`
      );
    }
  }

  onMouseUp(): void {
    this.isDraggingOuter = false;
    this.isDraggingOuter2 = false;
  }

  private calculateAngle(mouseX: number, mouseY: number): number {
    return Math.atan2(mouseY - this.centerY, mouseX - this.centerX) * (180 / Math.PI);
  }

  ngOnDestroy(): void {
    // Cleanup if necessary
  }

// Initial setup

  value: number = 1;  // Initial value
value2: number = 0;  // Initial value

  increment(number: number) {
   
   
      if(number === 0) {
   if(this.value < 9) {
        this.value++;
   }
      } else {
        if ( this.value2 < 9) {
          this.value2++;    
        }
        }
  

  }
  decrement(number) {
    
      if(number === 0) {
        if(this.value> 1) {
        this.value--;
        }
      } else {
        if ( this.value2 > 0) {
        this.value2--;
        }
      }
    
  }

}
