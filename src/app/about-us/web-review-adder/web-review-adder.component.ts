import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PropertyInformationService } from '../../Services/Property-info/property-information.service';
import { NavInfoService } from '../../Services/NavService/nav-info.service';
import { ReviewsService } from '../../Services/reviews/reviews.service';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-web-review-adder',
  templateUrl: './web-review-adder.component.html',
  styleUrl: './web-review-adder.component.scss'
})
export class WebReviewAdderComponent {
starRating = [{id:0, filled:true }, {id: 1, filled:true}, {id: 2, filled:true}, {id:3 ,filled:true},{id: 4 ,filled:true}];
reviewForm:FormGroup;

momxmareblis_id;
shefaseba:number;
reviewAd={
header:'Add Review',
p:'your Rating For This  Listing',
placeholderN:'Review',
submit:'Submit Review'
}
reqSent={bol:false,text:'შეფასება გაიგზავნა'}

Error={bol:false , text:'შეფასება ვერ გაიგზავნა'};

constructor( private lang:LanguageChooserService 
  , private navServ:NavInfoService , private reviewServ:ReviewsService) {
this.reviewAd=this.lang.chosenLang.Webreview;

 }

ngOnInit(){

this.navServ.getUserInfo(this.navServ.userId, true).subscribe((resp)=>{})

  this.reviewForm = new FormGroup({

    
    gamgzavnis_saxeli_gvari: new FormControl('', ),
    shefasebis_teqsti: new FormControl(''),
  
    gamgzavnis_idi: new FormControl(''),
    shefasebis_qula: new FormControl(''),
    
    fotos_direqtoria: new FormControl(''),
  });

}


onSubmit(){

this.reviewForm.value.shefasebis_qula =this.shefaseba;

this.reviewForm.value.gamgzavnis_idi = this.navServ.userId;
this.reviewForm.value.gamgzavnis_saxeli_gvari = this.navServ.IsSignedIn.Name ;


this.reviewForm.value.fotos_direqtoria = this.navServ.IsSignedIn.imgLink;

console.log(this.reviewForm.value);
if(this.reviewForm.value.shefasebis_qula && this.reviewForm.value.gamgzavnis_idi ){
this.reviewServ.AddWebsiteReview(this.reviewForm.value).subscribe((resp)=>{
  console.log('response from adding review',resp);
  if(resp.status=='success' && resp){
    this.reqSent.bol=true;
  }else{
  this.Error.bol=true;
  }
  
  this.reviewForm.reset();
})
}
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
