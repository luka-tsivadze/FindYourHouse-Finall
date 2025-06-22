import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { LanguageChooserService } from '../Services/language-chooser/language-chooser.service';
import { on } from 'events';
import { max } from 'rxjs';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms ease-in', style({ opacity: 1 }))
      ]),
  
    ])
  ]
})
export class AboutUsComponent implements OnInit {
staticElements={
  headerH2:'About Our Company',
  headerH4:'Home / About Us',
  span1:'About',
  span2:'Find Houses',
  mainText:`
ჩვენ შესახებ
„FindHouse.ge“ – უძრავი ქონების საიმედო და თანამედროვე პლატფორმა საქართველოში.

ჩვენი მთავარი მიზანია მომხმარებლებს შევთავაზოთ სრულყოფილი, მარტივი და ეფექტური საშუალება, გაეცნონ, იპოვონ და განახორციელონ უძრავი ქონების ოპერაციები – ყიდვა, გაყიდვა და გაქირავება. „FindHouse.ge“ იქმნება იმისთვის, რომ ხელი შევუწყოთ როგორც ყიდველებს, ასევე გამყიდველებს და ინვესტორებს, სანდო და გამჭვირვალე გარემოში.

ჩვენ ვთანამშრომლობთ მრავალ ათეულ უძრავი ქონების სააგენტოსთან და დამოუკიდებელ გამყიდველებთან, ვაწვდით მომხმარებელს დონის შესაბამის ინფორმაციას და ვთავაზობთ თანამედროვე ტექნოლოგიურ სერვისებს, რომლებსაც აქვს მძლავრი ფილტრები, დეტალური სურათები, რეალური აღწერილობები და მომხმარებლისთვის სასარგებლო რჩევები.

ჩვენთვის მნიშვნელოვანია მომხმარებლის გამოცდილება, ამიტომ მუდმივად ვზრუნავთ პლატფორმის გაუმჯობესებაზე, რათა ძიების პროცესი გახდეს ინტუიციური, სწრაფი და მაქსიმალურად კომფორტული. ჩვენი ტექნიკური გუნდი იყენებს უახლეს ტექნოლოგიებს და ბაზრის ტრენდებს, რომ მომხმარებლებმა მიიღონ მხოლოდ მაღალი ხარისხის სერვისი.

„FindHouse.ge“-ს საშუალებით თქვენ შეგიძლიათ:

დაათვალიეროთ ყველაზე განახლებული და მრავალფეროვანი უძრავი ქონების ბაზა მთელი საქართველოს მასშტაბით;

მიიღოთ ზუსტი და დეტალური ინფორმაცია თითოეულ განცხადებაზე;

დაუკავშირდეთ პირდაპირ გამყიდველებსა და სააგენტოებს;

ისარგებლოთ პერსონალურად მორგებული ფილტრებით, რომლებიც დაგეხმარებათ სწრაფად მოძებნოთ თქვენთვის იდეალური ადგილი.

ჩვენ ვამაყობთ იმით, რომ გვყავს დიდი და ნდობით აღსავსე მომხმარებლების საზოგადოების მხარდაჭერა და ვაგრძელებთ ჩვენი სერვისის გაუმჯობესებას თქვენი საუკეთესო გამოცდილებისთვის.

„FindHouse.ge“ – თქვენი ახალი სახლიდან დაწყებული მომავლის სტარტამდე!
`,
btn:'Read More',
btn2:'Read Less'
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

  maxSize=false;
  IncreaseSize(){
    this.maxSize=true;
  }
  DecreaseSize(){
    this.maxSize=false;
  }
}

