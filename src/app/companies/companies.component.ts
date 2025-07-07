import { Component } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent {

cards=[{header:'Company 1',content:'Company 1 content',footer:'Company 1 footer' , amount:'252', number:'571130768', location:'El.Georgia', imgLink:'https://www.w3schools.com/howto/img_avatar.png' },
{header:'Company 2',content:'Company 2 content',footer:'Company 2 footer' , amount:'252', number:'571130768', location:'El.Georgia', imgLink:'https://www.w3schools.com/howto/img_avatar.png' },
{header:'Company 3',content:'Company 3 content',footer:'Company 3 footer' , amount:'252', number:'571130768', location:'El.Georgia', imgLink:'../../assets/Imges/CardDetailed/home-slider-4.jpg' },
{header:'Company 4',content:'Company 4 content',footer:'Company 4 footer' , amount:'252', number:'571130768', location:'El.Georgia', imgLink:'https://www.w3schools.com/howto/img_avatar.png' },
{header:'Company 5',content:'Company 5 content',footer:'Company 5 footer' , amount:'252', number:'571130768', location:'El.Georgia', imgLink:'https://www.w3schools.com/howto/img_avatar.png' },

]


moveToDetailed(){
alert('Moving to detailed view...');
}
sentMessage(){
  alert('Message sent successfully!');
}

}
