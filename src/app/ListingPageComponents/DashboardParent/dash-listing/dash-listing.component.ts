import { Component } from '@angular/core';
import { LanguageChooserService } from '../../../Services/language-chooser/language-chooser.service';
import { ListingServiceService } from '../../../Services/listing-service/listing-service.service';

@Component({
  selector: 'app-dash-listing',
  templateUrl: './dash-listing.component.html',
  styleUrl: './dash-listing.component.scss'
})
export class DashListingComponent {
  Header='Listing';
 staticHeaders=['Listing Name','Date','Rating','Status','Edit'];
 Data
listing=[
]
statusi
constructor(private lang:LanguageChooserService ,private listserv:ListingServiceService){

this.listserv.userData().subscribe({
next: (data) => { 
this.Data=data;

  data.map((item) => {
    
   if(item.additionalInfo.statusi=='aqtiuri'){
    this.statusi=this.lang.chosenLang.Dashboard.dash_listing.status[0];
   }else{
    this.statusi=this.lang.chosenLang.Dashboard.dash_listing.status[1];
   }
    this.listing.push({
      name: item.title,
      date: item.date,
      rating: item.review,
      status: this.statusi,
    });
  });
},
error: (error) => { console.error(error); }
});
}

ngOnInit(){
  this.Header=this.lang.chosenLang.Dashboard.dash_listing.Header;
  this.staticHeaders=this.lang.chosenLang.Dashboard.dash_listing.headers;

}

edit(info,id){
    localStorage.setItem('ActiveElement', 'Add Property'); // Update the active component
    console.log(info);
    this.listserv.setEditItemId(this.Data[id]); // Pass the ID to the shared service
  }


}
