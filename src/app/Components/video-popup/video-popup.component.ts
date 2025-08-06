import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AllCardsService } from '../../Services/all-cards/all-cards.service';
import { PropertyInformationService } from '../../Services/Property-info/property-information.service';

@Component({
  selector: 'app-video-popup',
  templateUrl: './video-popup.component.html',
  styleUrl: './video-popup.component.scss'
})
export class VideoPopupComponent implements OnInit {

@Output() close = new EventEmitter<void>()
videoLink: string | null = null;
videoUrl: any = null;
 constructor(private cardservice: PropertyInformationService) { 
 }

 closePopup(): void {
  this.close.emit();
}
  ngOnInit(): void {
    this.cardservice.chosenCard.subscribe((data: any) => {
      this.videoLink = data.videoLink;
      this.videoUrl = data;

    })
  
  }
}
