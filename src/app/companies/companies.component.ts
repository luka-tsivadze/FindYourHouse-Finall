import { Component } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent {

cards: Array<{
    gncxdebis_idi: number;
    featuredBtn: boolean;
    For: string;
    imgLink: string;
    alt: string;
    header: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    video: string;
    area: number;
    garages: number;
    currency: string;
    price: any; // Changed to number or string
    basePrice:number ;
    curConverted:boolean;
    companyname?:string;
    uploadmonth:number;
  }>
    =[
      {
        gncxdebis_idi: 1, 
        featuredBtn: false,  
        For: 'For Sale',
        imgLink: 'https://www.w3schools.com/howto/img_avatar.png',
        alt: 'Company 1 Logo',
        header: 'Dream Homes Realty',
        location: '123 Main St, Cityville',
        uploadmonth:21, 
        bedrooms: 4,
        bathrooms: 3,
        video: 'https://example.com/video1.mp4',
        area: 2500,
        garages: 2,
        currency: '$',
        price: 450000,
        basePrice:450000 ,
        curConverted:false,
        companyname:'Dream Homes Realty',
      },
      {
        gncxdebis_idi: 2, 
        featuredBtn: false,  
        For: 'For Rent',
        imgLink: 'https://www.w3schools.com/howto/img_avatar2.png',
        alt: 'Company 2 Logo',
        header: 'Urban Living Properties',
        location: '456 Oak Ave, Metropolis',
        bedrooms: 2,
        bathrooms: 2,
        video: 'https://example.com/video2.mp4',
        area: 1200, 
        garages: 1,
        currency: '$',
        price: 2200,
        basePrice:2200 ,
        curConverted:false,
          uploadmonth:9, 
        companyname:'Urban Living Properties',  
      }
]


moveToDetailed(){
alert('Moving to detailed view...');
}
sentMessage(){
  alert('Message sent successfully!');
}

}
