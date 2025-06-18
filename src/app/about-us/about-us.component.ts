import { Component, OnInit, ViewChild } from '@angular/core';
import { LanguageChooserService } from '../Services/language-chooser/language-chooser.service';
import { on } from 'events';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit {
staticElements={
  headerH2:'About Our Company',
  headerH4:'Home / About Us',
  span1:'About',
  span2:'Find Houses',
  mainText:`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum odio id voluptatibus incidunt cum? Atque quasi eum debitis optio ab. Esse itaque officiis tempora possimus odio rerum aperiam ratione, sunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit sunt.
`,
btn:'Read More'
}


  showCover = true; // Controls the visibility of the cover
  @ViewChild('videoPlayer') videoPlayer: any;
  // Play video and hide the cover
  
  constructor(private lang:LanguageChooserService){

  }
  ngOnInit(): void {
   this.staticElements=this.lang.chosenLang.About;
  }

  playVideo() {
    const videoElement = this.videoPlayer.nativeElement;
   
    if (videoElement) {
   
      this.showCover = !this.showCover; // Hide the cover
      if(this.showCover){
        videoElement.pouse();
    
      }else{
        videoElement.play();
    }
  }
  }
}
