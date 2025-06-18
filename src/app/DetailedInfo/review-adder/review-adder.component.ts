import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PropertyInformationService } from '../../Services/Property-info/property-information.service';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';
import { NavInfoService } from '../../Services/NavService/nav-info.service';
import { ReviewsService } from '../../Services/reviews/reviews.service';

@Component({
  selector: 'app-review-adder',
  templateUrl: './review-adder.component.html',
  styleUrl: './review-adder.component.scss'
})
export class ReviewAdderComponent  implements OnInit {
starRating = [{id:0, filled:true }, {id: 1, filled:true}, {id: 2, filled:true}, {id:3 ,filled:true},{id: 4 ,filled:true}];
reviewForm:FormGroup;
gancxadebis_id;
momxmareblis_id=this.prop.userId;
shefaseba:number;
reviewAd={
header:'Add Review',
p:'your Rating For This  Listing',
placeholderN:'Review',
submit:'Submit Review'
}
reqSent=false;

constructor(private prop:PropertyInformationService, private http:HttpClient ,private lang:LanguageChooserService 
  , private navServ:NavInfoService , private reviewServ:ReviewsService) {
this.reviewAd=this.lang.chosenLang.DetailedInfo.reviewAd;

 }
adresati_idi;
ngOnInit(){
  this.prop.chosenCard.subscribe((card) => {
    this.gancxadebis_id=card.id;
    this.adresati_idi=card.momxmareblis_id;
  })
  this.reviewForm = new FormGroup({
    saxeli: new FormControl(''),
    
    maili: new FormControl('', ),
    message: new FormControl(''),
    gancxadebis_id: new FormControl('', ),
    momxmareblis_id: new FormControl(''),
    shefaseba: new FormControl(''),
    adresatis_idi: new FormControl(''),
    foto: new FormControl(''),
  });

}


onSubmit(){

this.reviewForm.value.shefaseba =this.shefaseba;
this.reviewForm.value.gancxadebis_id = this.gancxadebis_id;
this.reviewForm.value.momxmareblis_id = this.momxmareblis_id;
this.reviewForm.value.saxeli = this.navServ.IsSignedIn.Name;
this.reviewForm.value.maili = this.navServ.IsSignedIn.email;
this.reviewForm.value.adresatis_idi = this.adresati_idi;
this.reviewForm.value.foto = this.navServ.IsSignedIn.imgLink;

console.log(this.reviewForm.value);
if(this.reviewForm.value.shefaseba && this.reviewForm.value.momxmareblis_id){
this.http.post('save_review.php', this.reviewForm.value).subscribe({
next: (data: { status: string }) => { console.log(data); 
  if(data.status == "success"){
    this.reqSent=true;
    console.log(this.gancxadebis_id);
  this.loadReviews(this.gancxadebis_id);
  }},
error: (error) => { console.error(error); }

})
}
}
loadReviews(id){

  this.reviewServ.fetchCardReviews(id).subscribe((resp)=>{
    console.log('this should load new data ',resp);
  });
}

rater(star){

 
      for(let i = 0; i < star; i++){
        this.starRating[i].filled = true;
      }
      for(let i = star; i < 5; i++){
        this.starRating[i].filled = false;
      }
 
      
this.shefaseba =(5-star);

  }
}


