import { Component } from '@angular/core';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';

@Component({
  selector: 'app-tags-r',
  templateUrl: './tags-r.component.html',
  styleUrl: './tags-r.component.scss'
})
export class TagsRComponent {
tagscomp={
  header:'Popular Tags',
  Tags : ['Houses', 'Real Home', 'Baths', 'Beds', 'Garages', 'Family','Real Estates','Properties','Location','Price']
}
constructor(private lang:LanguageChooserService) {
  this.tagscomp=this.lang.chosenLang.DetailedInfo.tagscomp;
 }

}
