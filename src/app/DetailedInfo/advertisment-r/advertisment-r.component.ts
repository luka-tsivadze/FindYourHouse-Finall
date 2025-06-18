import { Component } from '@angular/core';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';

@Component({
  selector: 'app-advertisment-r',
  templateUrl: './advertisment-r.component.html',
  styleUrl: './advertisment-r.component.scss'
})
export class AdvertismentRComponent {
h3='advertisment'

 constructor(private lang:LanguageChooserService) {
  this.h3=this.lang.chosenLang.DetailedInfo.advertismentr
  }

}
