import { Injectable } from '@angular/core';
import { Agent } from 'node:http';

@Injectable({
  providedIn: 'root',
})
export class EngService {

  MenuBar = {
    Home: [],
  
    Property: [],
    Pages: [ 
      { a: 'User Panel', chack:'User Panel', Showimg: true,  RouterLink: '/Listing', subText: [ {text:'Dashboard',value:'Dashboard'},
        { text:'Profile',value:'Profile' }, {text:'My Properties',value:'My Properties'}, { text:'Favorited Properties',value:'Favorited Properties'} ,
         {text:'Add Property',value:'Add Property'} ,{text:'Payments',value:'Payments'},{text:'Change Password',value:'Change Password'}] },
      { a: 'Login', chack:'Login', Showimg: false },
      { a: 'Register',chack:'Register', Showimg: false, RouterLink: ''  },
      { a: 'About Us',  Showimg: false, RouterLink: '/about' },
    ],
    Blog: [ 
      { a: 'text', Showimg: true, subText: ['text1', 'text2', 'text3'] },
      { a: 'text', Showimg: false },
      { a: 'text', Showimg: false }
    ],
    profileSettings:[
      {Text:'Add Property',value:'Add Property'},
      {Text:'My Properties', value:'My Properties'},
      {Text:'Favorited Properties', value:'Favorited Properties'},
      {Text:'Edit Profile', value:'Edit Profile', routes:''},
      {Text:'Payments', value:'Payments' },{Text:'Change Password', value:'Change Password'},
      {Text:'Log Out',value:'Log Out'}]
  };
  NavE = {
    Home: 'Home',
   
    Property: 'Property',
    Pages: 'Pages',
    Blog: 'Blog',
    companies:'Companies',
    Contact: 'contact',
    SignIn: 'SignIn',
    AddListing: 'Add Listing',
  };
  Header = {
    FindYourHouse: 'Find Your Dream ',
    weHaveOverMillion: 'We Have Over Million Property For You',
    status:['For Sale','For Rent','pledge','Rented daily','Apartments Under Construction'],
    location: 'Location',
    KayWord: 'Enter keyword..',
    propertyType: 'propertyType',
    Advanced: 'Advanced Search ',
    Search: 'Search Now',
  };
  popularPlaces = {
    Header: 'Popular Places',
    properties: 'Properties In Most Popular Places',
    prop: 'properties',
  };
   popularPlacesSubject = [ {
    cityName: 'Tbilisi',

  },
  {

    cityName: 'Batumi',

  },
  {

    cityName: 'Kutaisi',

  },
  {

    cityName: 'Rustavi',

  },
  {

    cityName: 'Zugdidi',

  },
  {

    cityName: 'Telavi',

  },
  {

    cityName: 'Bakurian',
   
  },
  {
  
    cityName: 'Kobuleti',
  
  },];
  

  featuredPropertiesStatic = {
    Header: 'Featured Properties',
    properties: 'Properties In Most Popular Places',
    featured: 'Featured',
    For: 'For',
    BedRooms: ' Bedrooms',
    BathRooms: 'Bathrooms',
    Garage: 'Garages',
    Area: 'sq M',
    ViewDetails: 'View More',
  };
  main = { 
    WhyChooseUs: 'Why Choose Us',
    everyStep: 'We provide full service at evey step ',
    popularPropertys: 'Discover popular properties',
    AgentsH: 'Meet our agents',
    AgentsP: 'Our Agents are here to help you',
    AgentsB:'View more',
    Agents:'Properties',
    RHeader: 'Clients Testimonials',
    Rptext: 'We collect reviews from our customers.',
  };
  SFooter={headerFP:'Our Partners',pFP:'The Company That Represent Us.' , NavFooter:'Navigation',NewsFooter:'Newsletters', 
    NewsFooterText:'Sign Up For Our Newsletter To Get Latest Updates And Offers. Subscribe To Receive News In Your Inbox.',NewsFooterBtn:'SUBSCRIBE',
     NewsFooterPlaceHolder:'Enter Your Email',
     terms:'Terms and Conditions',
     Policy:'Privacy Policy',
    };

  FooterData={
    FindHouse:{mainText:'New real estate buying and selling and renting portal in Georgia',
              location:'Georgia',
              Number:'+995 32 21 14 844',
              Email:'infofindhous@gmail.com'
    },
  Navigation:[
    {list1:'Home One',list2:'Agents Details' ,routerLink1:'' , routerLink2:''},
    {list1:'Properties Right',list2:'About Us' , routerLink1:'',routerLink2:'/about' },
    {list1:'Properties List',list2:'Blog Default' , routerLink1:'/allCards',routerLink2:'/**'  },
    {list1:'Property Details',list2:'Blog Details', routerLink1:'/allCards',routerLink2:''},
    {list1:'Agents Listing' , list2:'Contact Us', routerLink1:'',routerLink2:'/contact' },
  ],
  
}

     For={
    text: 'Property Status',
    optdisplay:['For Sale', 'For Rent' ,'Pledge','Rented daily','Apartments Under Construction'],
  }
 allFilter={
  translated:{
  SortBy:'SORTBY:',
  activeEl:'Top Selling',
sortingOptions : [{name:'Top Selling',state:true},
  {name:'Most Viewed',state:false},
  {name:'Price: Low to High',state:false}
  ,{name:'price: Hight to Low ',state:false}],
results:'search resoults', 
view:'Grid View',
list:'List View',
home:'Home',
 homeL:'/Listings'
},
  FirstFilter:{
    locations: ['Tbilisi', 'Batumi', 'Kutaisi', 'Rustavi', 'Zugdidi', 'Telavi', 'Bakuriani', 'Kobuleti','Gori','Poti','Marneuli','Khashuri','Samtredia','Zestaponi','Akhaltsikhe','Senaki','Ozurgeti','Kaspi','Chiatura','Gardabani','Borjomi','Sagarejo','Kvareli','Bolnisi','Tkibuli','Khoni','Tskaltubo','Akhalkalaki','Mtskheta','Gurjaani','Dusheti',
      'Lanchkhuti','Lagodekhi','Sachkhere','Dedoplistskaro','Abasha','Martvili','Ninotsminda','Tsalka','Vani','Dmanisi','Tsalenjikha', 'Keda'],
    locationDis:['Tbilisi', 'Batumi', 'Kutaisi', 'Rustavi', 'Zugdidi', 'Telavi', 'Bakuriani', 'Kobuleti','Gori','Poti','Marneuli','Khashuri','Samtredia','Zestaponi','Akhaltsikhe','Senaki','Ozurgeti','Kaspi','Chiatura','Gardabani','Borjomi','Sagarejo','Kvareli','Bolnisi','Tkibuli','Khoni','Tskaltubo','Akhalkalaki','Mtskheta','Gurjaani','Dusheti',
      'Lanchkhuti','Lagodekhi','Sachkhere','Dedoplistskaro','Abasha','Martvili','Ninotsminda','Tsalka','Vani','Dmanisi','Tsalenjikha', 'Keda'],

    PropertyTypes:  ['Apartment', 'House','country House','Land Plot','Commercial', 'Hotel'],
    PropertyTypesDis:  ['Apartment', 'House','country House','Land Plot','Commercial', 'Hotel']
  },
  filter : {
    SelectInputs: [
         
      {
        imgLink: '../../../assets/Imges/StaticImg/StaticIcons/sleeping.png',
        text: 'Bedrooms',
        options: ['Bedrooms','1', '2', '3', '4', '5', '6', '7'],
        name: 'bedrooms',
      },
      {
        imgLink: '../../../assets/Imges/StaticImg/StaticIcons/bathtub.svg',
        text: 'Bathrooms',
        options: ['Bathrooms','1', '2', '3', '4', '5'],
        name: 'bathrooms', // Added name
      },
    ],
    range:{
      area:'Area Size',
      MAmount:'sq M',
     Price:'Price Range'
    },
    filteredCheckBox: [
      { id: '1', label: 'Air Conditioning', name: 'Air Conditioning', formcontroller:'airConditioning'},
      { id: '2', label: 'Swimming Pool', name: 'Swimming Pool', formcontroller:'swimmingPool' },
      { id: '3', label: 'TV Cable & wifi', name: 'TV Cable & wifi',  formcontroller:'tvCable' },
      { id: '4', label: 'Central Heating', name: 'Central Heating',   formcontroller:'centralHeating' },
  
      { id: '5', label: 'Laundry Room', name: 'Laundry Room',  formcontroller:'laundryRoom' },
      { id: '6', label: 'Microwave', name: 'Microwave', formcontroller:'microwave' },
      { id: '7', label: 'Gym', name: 'Gym', formcontroller:'gym' },
  
      { id: '8', label: 'Alarm', name: 'Alarm',  formcontroller:'alarm' },
      { id: '9', label: 'Refrigerator', name: 'Refrigerator',  formcontroller:'refrigerator' },
      { id: '10', label: 'Window Covering', name: 'Balcony',  formcontroller:'windowCovering' },

      {label: 'sardafi', name:'basement', id: '11', formcontroller: 'sardafi'},
      { label: 'lifti',  name:'Elavator', id: '12', formcontroller: 'lifti' },
      { label: 'garage',  name:'Garage', id: '13',  formcontroller: 'garage' },
      { label: 'bolo_sartuli',  name:'Top Floor', id: '14',  formcontroller: 'bolo_sartuli' },
      { label: 'bunebrivi_airi', name:'Natural gas' , id: '15', formcontroller: 'bunebrivi_airi' },
      { label: 'satavso',  name:'Storage',  id: '16',  formcontroller:'satavso' },
  
    ],

  },

 }
 Registration={

  confirmation:{ text:'You have Succesfully Registered' , show:false},  
  mainInputs:[
   {FormControlName:'saxeli' , labelText:'First Name*', For:"firstNameReg" ,type:'text' ,errortext:'First Name is required.', chack:false},
   {FormControlName:'gvari' , labelText:'Last Name*', For:"lastNameReg" ,type:'text' ,errortext:'Last Name is required.', chack:false},
   {FormControlName:'maili' , labelText:'Email Address*', For:"emailReg" ,type:'email' ,errortext:'Email is required.' , chack:false},
   {FormControlName:'paroli' , labelText:'Password*', For:"passwordReg" ,type:'password' ,errortext:'Password is required.' , chack:false},
   {FormControlName:'paroliRepeat' , labelText:'Repeat Password*', For:"repeatPasswordReg" ,type:'password' ,errortext:'Passwords must match.' , chack:true},
 ],
 register:{
   buttonText:'Register',
   mobile:'mobile Number*',
   notification:'verification ended succsesfully',
   Codeerror:'Code is incorrect',
   GError:'Gender is required',
   numbererror:'write Your phone number',
   Hgender:'Gender*',   
   agree:'I agree to',
   terms:'the terms and conditions',

   Man:'Male',
   Fam:'Famale',
   codeHolder:'Enter the code  you received on the phone',
 
   respErrorNumber:'Phone number is incorrect',
   respErrorEmail:'Email already in use',
   respErrorEmailInvalid:'Email is invalid',
   respErrorServer:'There is a problem with the server, try again later.',
 },
 login:{
    inputs:[
     {FormControlName:'maili' , labelText:' Email Address*', For:"firstNameLogin" ,type:'text' ,errortext:'Write Your  Email.' },
     {FormControlName:'paroli' , labelText:'Password*', For:"passwordLogin" ,type:'password' ,errortext:'Password must be at least 6 characters.' },
    ],
    button:'Login',
    remember:'Remember Me',
     forget:'Forget Password?',
 }
 
 }
 
     
  constructor() {}
}




















