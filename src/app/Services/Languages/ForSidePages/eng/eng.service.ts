import { Injectable } from '@angular/core';
import { CardGallery1Component } from '../../../../DetailedInfo/card-gallery1/card-gallery1.component';
import { scheduled } from 'rxjs';
import { FormControlName } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class EngService {
  allForms = {
    form1info: {
      HeaderName1: 'Property description and price',
      firstTitle: 'Property title',
      firstplaceHolder: 'Enter your property title',

      secondTitle: 'Property description',
      secondplaceHolder: 'describe your property',

      firstselectName: 'Select Status',
      firstselect: [
        'For Sale',
        'For Rent',
        'Rented daily',
        'Pledge',

      ],
      firstselectValues: [
        'იყიდება',
        'ქირავდება',
        'ქირავდება დღიურად',
        'გირავდება',
       
      ],

      secondselectName: 'Property Types',
      secondselect:  ['Apartment', 'House','country House.','Land Plot','Commercial', 'Hotel'],
      secondselectValues: ['Apartment', 'House','country House.','Land Plot','Commercial', 'Hotel'],
      upPict: 'click Hare To Upload Pictures',
      upVid: 'click Hare  To Upload Video',
      upPlan: 'click Hare To Upload Floor Plan',
      loadingScreen: 'Loading...',

      thirdselectName: 'Rooms',

      thirdTitle: 'Price',
      fourthTitle: 'area',

      HeaderName2: 'Property Pictures',
      HeaderName3: 'Property Video',
      HeaderName4: 'Floor Plan',
      HeaderName5: 'Property Location',
      HeaderName6: 'Extra Information',
      HeaderName7: 'Propert Features',
      HeaderName8: 'Contact Information',
      submit: 'Submit Property',
    },

    form4Info: [
      {
        id: 'Age',
        FormControlName: 'asaki',
        firstOption: 'Select Age',
        options: [
          '0-1 Years',
          '0-5 Years',
          '0-10 Years',
          '0-15 Years',
          '0-20 Years',
          '0-50 Years',
          '50+ Years',
        ],
        optionsValues: [
          '0-1 წელი',
          '0-5 წელი',
          '0-10 წელი',
          '0-15 წელი',
          '0-20 წელი',
          '0-50 წელი',
          '50+ წელი',
        ],
        formControlName: 'asaki',
      },
      {
        id: 'badrooms',
        firstOption: 'Bedrooms',
        options: ['1', '2', '3', '4', '5', '6'],
        optionsValues: ['1', '2', '3', '4', '5', '6'],
        formControlName: 'sadzinebeli',
      },
      {
        id: 'bathroom',
        firstOption: 'Bathrooms',
        options: ['1', '2', '3', '4', '5', '6'],
        optionsValues: ['1', '2', '3', '4', '5', '6'],
        formControlName: 'sveli_wertilebis_raodenoba',
      },
    ],
    City: {
      HeaderName: 'City',
      placeHolder: 'Enter Your city',
      id: 'City',
      formControlName: 'qalaqi',
      type: 'text',
    },

    form3Info: [
      {
        HeaderName: 'Address',
        placeHolder: 'Enter Your Address',
        id: 'adress',
        formControlName: 'misamarti',
        type: 'text',
      },

      // {
      //   HeaderName: 'Google Map Latitude',
      //   placeHolder: 'Google Map Latitude',
      //   id: 'mapa',
      //   formControlName: 'mapis_grdzedi',
      //   type: 'number',
      // },
      // {
      //   HeaderName: 'Google Map Longitude',
      //   placeHolder: 'Google Map Longitude',
      //   id: 'mapo',
      //   formControlName: 'mapis_ganedi',
      //   type: 'number',
      // },
    ],

    form5Info: [
      { text: 'Air Conditioning', id: 'air', formControlName: 'kondincioneri' },
      { text: 'Swimming Pool', id: 'pool', formControlName: 'sacurao_auzi' },
      {
        text: 'Central Heating',
        id: 'Heating',
        formControlName: 'centraluri_gatboba',
      },
      { text: 'Laundry Room', id: 'room', formControlName: 'samrecxao_otaxi' },
      { text: 'Gym', id: 'gym', formControlName: 'sportuli_darbazi' },
      { text: 'Alarm', id: 'alarm', formControlName: 'signalizacia' },
      { text: 'balcony', id: 'balcon', formControlName: 'aivani' },
      { text: 'Refrigerator', id: 'Refrigerator', formControlName: 'macivari' },
      { text: 'TV Cable & WIFI', id: 'TV', formControlName: 'televizia_wifi' },
      { text: 'Microwave', id: 'Mic', formControlName: 'microtalguri' },

      {text: 'basement', id: 'basement', formControlName: 'sardafi'},
      { text: 'Elevator', id: 'lift', formControlName: 'lifti' },
      { text: 'Garage', id: 'garage', formControlName: 'garage' },
      { text: 'Top Floor', id: 'Floor', formControlName: 'bolo_sartuli' },
      { text: 'Natural gas', id: 'gas', formControlName: 'bunebrivi_airi' },
      { text: 'Storage', id: 'storage', formControlName: 'satavso' },
    ],
    NearByTranslate: {
      Header: 'Nearby Places',
      placeholder: 'Enter name of place:',
      placeholderDist: 'distance',
      sections: ['Education', 'Health', 'Transport'],
      units: ['km', 'meter'],
      unitstr: ['km', 'meter'],
      error: 'only 3 sections are allowed',
    },

    form6Info: [
      {
        HeaderName: 'Name',
        placeHolder: 'Enter Your Name',
        id: 'name6',
        formControlName: 'momxmareblis_saxeli',
      },

      {
        HeaderName: 'Email',
        placeHolder: 'Enter Your Email',
        id: 'Email6',
        formControlName: 'el_fosta',
      },
      {
        HeaderName: 'Phone',
        placeHolder: 'Enter Your Number',
        id: 'Number6',
        formControlName: 'telefonis_nomeri',
      },
    ],
  };
  LeftInfo = [
    {
      icon: '../../../assets/Imges/StaticImg/StaticIcons/Location.svg',
      Text: 'Dashboard',
      upText: 'Dashboard',
    },
    {
      icon: '../../../assets/Imges/StaticImg/StaticIcons/person-fill.svg',
      Text: 'Profile',
      upText: 'Profile',
    },
    {
      icon: '../../../assets/Imges/StaticImg/StaticIcons/list.svg',
      Text: 'My Properties',
      upText: 'My Properties',
    },

    {
      icon: '../../../assets/Imges/StaticImg/StaticIcons/heart-fill.svg',
      Text: 'Favorited Properties',
      upText: 'Favorited Properties',
    },
    {
      icon: '../../../assets/Imges/StaticImg/StaticIcons/list.svg',
      Text: 'Add Property',
      upText: 'Add Property',
    },
    {
      icon: '../../../assets/Imges/StaticImg/StaticIcons/business.svg',
      Text: 'My Business',
      upText: 'My Business',
    },
    {
      icon: '../../../assets/Imges/StaticImg/StaticIcons/credit-card-fill.svg',
      Text: 'Payments',
      upText: 'Payments',
    },

    {
      icon: '../../../assets/Imges/StaticImg/StaticIcons/lock-fill.svg',
      Text: 'Change Password',
      upText: 'Change Password',
    },
    {
      icon: '../../../assets/Imges/StaticImg/StaticIcons/log-out.svg',
      Text: 'Log Out',
      upText: 'Log Out',
    },
  ];
  Dashboard = {
    dash_listing: {
      mainHeader: 'Dashboard',
      headers: ['Listing Name', 'Date', 'Rating', 'Status', 'Edit'],
      status:['Active', 'Inactive'],
    },
    manage: {
      header: 'Manage Dashboard',
      cards: [
        { title: 'Published Property' },
        { title: 'Total Reviews' },
        { title: 'Messages' },
        { title: 'Times Bookmarked' },
      ],
    },
    DashReview: {
      header: 'Review',
    },
    PersonalInfo: {
      staticElements: {
        Header: 'Personal Information',
        updateBtn: 'Update Your Password',
        submit: 'Submit',
        placeholder:'write Your Profile Link here',
      },
      inputText: [
        {
          label: 'First Name',
          placeholder: 'Enter Your First Name',
          FormControl: 'saxeli',
        },
        {
          label: 'Last Name ',
          placeholder: 'Enter Your Last Name ',
          FormControl: 'gvari',
        },

        {
          label: 'Phone Number',
          placeholder: 'ex:+1-800-7700-00',
          FormControl: 'phone',
        },
        { label: 'Address', placeholder: 'Write Your Address hare' },
      ],
      textArea: [
        { label: 'About Yourself', placeholder: 'Write about Yourself', FormControlName: 'chems_shesaxeb',},
      ],
      UserMessage:{text:'Your Information has been updated successfully',error:false,   
        ErrorText:'upload Failed',  fileSelected:false},
      Elements:{Header:'Upload Profile photo'  , submit:'Save' },
      
      

      //"!"
      UserSelect:[
        {label:'Account type', placeholder:'Choose Acaunt Type' ,options:{dis:['Sales Manager','User'], val:['gayidvebis_menejeri','momxmarebeli'] },FormControlName:'angarishis_tipi'},
         {label:'Gender',placeholder:'Choose Gender' ,options:{dis:['Male', 'Female'],val:['kaci', 'qali'] },FormControlName:'sqesi'}
      ],
      Allnetworks : {
        Header: 'Social Networks',
        elements: [
          {
            
            FormControlHref: 'facebook_linki',
           name: 'Facebook', 
           value:'Facebook'
          },
          {
            
            FormControlHref: 'instagram_linki',
        name: 'Instagram', value:'Instagram'
          },
          {
            
            FormControlHref: 'telegram_linki',
      name: 'Telegram', value: 'Telegram'
          },
          {
            
            FormControlHref: 'linkedin_linki',
           name: 'LinkedIn', value: 'LinkedIn'
          },
          {
            FormControlHref: 'whatsapp_linki',
           name: 'WhatsApp',
           value:'WhatsApp'
          }
      
         
        ]
      }
    },
  };
  Profile = {
    header: 'Profile Details',
    inquary: 'Request Inquary',
    submit: 'Submit Request',
    input: ['First Name', 'Phone Number', 'Email'],
  };
  ChangePassword = {
    header: 'change Password',
    pas: 'Current password',
    NewPas: 'New password',
    ConfPas: 'Confirm Your password',
    submit: 'Send Changes',
        cantchange:{
      header:'Password Change Unavailable',
      text:`You can't change your password because you are signed in with Google or Facebook`
    }
  };
  myProp = {
    Header: 'Top Properties',
    date: 'Date Added',
    Views: 'Views',
    action: 'Actions',
    rew: 'Reviews',
    ago: 'Days Ago',
    Ed: 'Edit',
    prev: 'Previous',
    next: 'Next',
  };
  contact = {
    staticText: {
      header: 'Contact Us',
      headerH4: 'Home  /  Contact Us',
      Mes: 'Message',
      sub: 'Submit',
      cd: 'Contact Details',
      cp: 'Please find below contact details and contact us today!',
    },
    inputs: [
      { placeholder: 'First Name', type: 'text', FormControlname: 'saxeli' },
      { placeholder: 'Last Name', type: 'text', FormControlname: 'gvari' },
      { placeholder: 'Header', type: 'text', FormControlname: 'satauri' },
      { placeholder: 'Email', type: 'email', FormControlname: 'maili' },
    ],

  };
  About = {
    headerH2: 'About Our Company',
    headerH4: 'Home / About Us',
    span1: 'About',
    span2: 'Find Houses',
    mainText: `About Us
"FindHouse.ge" is a reliable and modern real estate platform in Georgia.

Our main goal is to offer users a complete, simple, and effective way to explore, find, and carry out real estate transactions – buying, selling, and renting. "FindHouse.ge" is created to support both buyers, sellers, and investors in a trustworthy and transparent environment.

We cooperate with dozens of real estate agencies and independent sellers, providing users with up-to-date information and offering modern technological services, including powerful filters, detailed images, real descriptions, and useful tips for users.

User experience is important to us, so we constantly work on improving the platform to make the search process intuitive, fast, and as comfortable as possible. Our technical team uses the latest technologies and market trends to ensure users receive only high-quality service.

With "FindHouse.ge" you can:

Browse the most updated and diverse real estate database throughout Georgia;

Get accurate and detailed information on each listing;

Contact sellers and agencies directly;

Use personalized filters to help you quickly find your ideal place.

We are proud to have a large and trusted community of users and continue to improve our service for your best experience.

"FindHouse.ge" – from your new home to the start of your future!`,
    btn: 'Read More',
    btn2: 'Read Less'
  };
  Webreview= {
    header: 'Add Review',
    p: 'Your feedback will help us to improve our website and services.',
    placeholderN: 'Review',
    submit: 'Submit Review',
  }
  DetailedInfo = {
    advertismentr: 'advertisment',
    AgentsInfo: {
      inputs: [
        {
          type: 'text',
          placeholder: 'First Name',
          formControlName: 'gamgzavnis_saxeli',
        },
        {
          type: 'text',
          placeholder: 'Phone Number',
          formControlName: 'gamgzavnis_tel_nomeri',
        },
        {
          type: 'email',
          placeholder: 'Email',
          formControlName: 'gamgzavnis_maili',
        },
      ],
      staticValues: {
        h3: 'Agent Information',
        p: 'Agent of Property', //could be changed to dynamic
        Agentp:'sales Manager ',
        Userp:'property Owner ',
        req: 'Send a message',
        submit: 'Submit Request',
        textArea: 'Message',
      },
    },
    CardGallery1: 'Gallery',
    unit: 'sq.m',
    parent: 'Description',
    Featuredpr: {
      header: 'Featured Properties',
      area: 'Area',
      rooms: 'Rooms',
      beds: 'Beds',
    },
    Floorplan: 'Floor Plan',
    leftAmenties: {
      h2: 'Property Details',
      h2a: 'Amenities',
      propstatic: [
 
        'Property Type',
        'Property Status',
   
        'Rooms',
        'Bedrooms',
        'Bath',
        'Area',
        'Year Built',
      ],
    },
    map: 'Location',
    near: "What's Nearby",
    propvideo: 'Property Video',
    recentStatic: 'Recent Properties',
    reviewAd: {
      header: 'Add Review',
      p: 'your Rating For This  Listing',
      placeholderN: 'Review',
      submit: 'Submit Review',
    },
    reviews: 'Reviews',
    scheduled: {
      header: 'Schedule a Tour',
      ad: 'Adult',
      ch: 'Children',
      submit: 'Submit',
    },
    simProp: 'Similar Properties',
    tagscomp: {
      header: 'Popular Tags',
      Tags: [
        'Houses',
        'Real Home',
        'Baths',
        'Beds',
        'Garages',
        'Family',
        'Real Estates',
        'Properties',
        'Location',
        'Price',
      ],
    },
  };

  constructor() {}
}
