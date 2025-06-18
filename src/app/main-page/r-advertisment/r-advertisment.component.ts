import { Component } from '@angular/core';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';

@Component({
  selector: 'app-r-advertisment',
  templateUrl: './r-advertisment.component.html',
  styleUrl: './r-advertisment.component.scss'
})
export class RAdvertismentComponent {
h3='advertisment'

 constructor(private lang:LanguageChooserService) {
  this.h3=this.lang.chosenLang.DetailedInfo.advertismentr
  }

}
