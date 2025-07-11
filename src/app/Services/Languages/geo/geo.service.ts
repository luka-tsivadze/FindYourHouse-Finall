import { Injectable } from '@angular/core';
import { every } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  MenuBar = {
    Home: [  ],
  
    Property: [ ],
    Pages: [ 
      { a: 'მომხმარებლის პანელი',chack:'User Panel', Showimg: true, RouterLink: '/Listing', subText: [ {text: 'მართვა', value: 'Dashboard'},
        { text: 'პროფილი', value: 'Profile' }, {text: 'ჩემი განცხადებები', value: 'My Properties'}, { text: 'შენახული განცხადებები', value: 'Favorited Properties'},
        {text: 'განცხადების დამატება', value: 'Add Property'} ,{text: 'გადახდა', value: 'Payments'},{text: 'პაროლის შეცვლა', value: 'Change Password'}] },
      { a: 'შესვლა',chack:'Login', Showimg: false },
      { a: 'რეგისტრაცია',chack:'Register' , Showimg: false, RouterLink: ''  },
      { a: 'ჩვენ შესახებ',  Showimg: false, RouterLink: '/about' },
    ],
    Blog: [ 
      { a: 'ტექსტი', Showimg: true, subText: ['ტექსტი 1', 'ტექსტი 2', 'ტექსტი 3'] },
      { a: 'ტექსტი', Showimg: false },
      { a: 'ტექსტი', Showimg: false }
    ],
    profileSettings: [
      { Text: 'განცხადების დამატება', value: 'Add Property' },
      {Text:'ჩემი განცხადებები', value:'My Properties'},
      {Text:'შენახული განცხადებები', value:'Favorited Properties'},
      { Text: 'პროფილის რედაქტირება', value: 'Edit Profile', routes: '' },
      { Text: 'გადახდები', value: 'Payments' },
      { Text: 'პაროლის შეცვლა', value: 'Change Password' },
      { Text: 'გასვლა', value: 'Log Out' }
    ]
    
  };
  

NavG={Home:'მთავარი ' , 
    Property:'უძრავი ქონება', Pages:'გვერდები',Blog:'ბლოგი',companies:'კომპანიები',
    Contact:'კონტაქტი',SignIn:'შესვლა',AddListing:'განთავსება',}

    Header={FindYourHouse:'იპოვე შენი საოცნებო ' ,weHaveOverMillion:'უამრავი ქონების ფართო სპექტრი - შეარჩიეთ ის , რაც თქვენ გჭირდებათ '  ,status:['იყიდება','ქირავდება','გირავდება','ქირავდება დღიურად',' მშენებარე ბინები'],
       KayWord:'საძიებო სიტყვა', propertyType:'ქონების ტიპი', Advanced:'გაფართოებული ძებნა', Search:'მოძებნა',location:'მდებარეობა'
    }
    popularPlaces={Header:'პოპულარული ადგილები' ,properties:'უძრავი ქონება ყველაზე პოპულარულ ადგილებში', prop:"ადგილი"} 
    popularPlacesSubject = [ {
      cityName: 'თბილისი',

    },
    {
  
      cityName: 'ბათუმი',
  
    },
    {
  
      cityName: 'ქუთაისი',
  
    },
    {
  
      cityName: 'რუსთავი',
  
    },
    {
  
      cityName: 'ზუგდიდი',
  
    },
    {
      cityName: 'თელავი',
    },
    {
      cityName: 'ბაკურიანი',
    },
    {
      cityName: 'ქობულეთი',
    },];
    
    featuredPropertiesStatic = {
      Header: 'პოპულარული განცხადებები',
      properties: 'ეს არის ჩვენი გამორჩეული განცხადებები',
      featured: 'რეკომენდირებული',
      For: 'იყიდება',
      BedRooms: 'საძინებელი',
      BathRooms: 'სააბაზანო',
      Garage: 'ავტოფარეხი',
      Area: 'კვ.მ',
      ViewDetails: 'მეტის ნახვა'
    }
    main={WhyChooseUs:'რატომ ჩვენ', everyStep:'ჩვენ გთავაზობთ სრულ სერვისს ყოველ ნაბიჯზე '   ,popularPropertys:'აღმოაჩინე პოპულარული ქონება' , AgentsH:'შეხვდით ჩვენ აგენტებს' , 
      AgentsP:'ჩვენ ყოველთვის მზად ვართ რომ დაგეხმაროთ' , 
      AgentsB:'ვრცლად ნახვა',
      Agents:'განცხადება',
        RHeader:'კლიენტების შეფასებები',Rptext:'ჩვენ ვაგროვებთ შეფასებებს ჩვენი მომხმარებლებისგან.'}
    
    SFooter = {
        headerFP: 'ჩვენი პარტნიორები', 
        pFP: 'კომპანიები, რომლებიც წარმოადგენენ ჩვენ ინტერესებს.', 
        NavFooter: 'სწრაფი წვდომა', 
          succesSubscribe: 'თქვენი ემაილი წაწმატებით დაემატა ',
              errorSubscribe: 'თქვენი ემაილი ვერ დაემატა, გთხოვთ, სცადოთ თავიდან',
        NewsFooter: 'საინფორმაციო მიმოწერა', 
        NewsFooterText: 'გაიარეთ რეგისტრაცია , რათა მიიღოთ უახლესი განახლებები და შეთავაზებები. გამოიწერეთ სიახლეები თქვენს ელფოსტაზე.', 
        NewsFooterBtn: 'გამოწერა', 
        NewsFooterPlaceHolder: 'შეიყვანეთ თქვენი ელ.ფოსტა',
             terms:'წესებს და პირობებს',
     Policy:'კონფიდენციალურობის პოლიტიკა',
        NewsFooterRequired: 'ელფოსტის ველი აუცილებელია',
    NewsFooterInvalid: 'გთხოვთ, შეიყვანოთ ვალიდური ელფოსტა',
      }
      
      FooterData = {
        FindHouse: {
          mainText: 'უძრავი ქონების ყიდვა-გაყიდვისა და გაქირავების ახალი პორტალი საქართველოში',
          location: 'საქართველო',
          Number: '+995 32 21 14 844',
          Email: 'infofindhous@gmail.com'
        },
        Navigation: [
          { list1: 'მთავარი', routerLink1: '/'  },
          {list1: 'კონტაქტი',  routerLink1: '/contact'},
          {list1: 'ჩვენ შესახებ', routerLink1: '/about' },
          { list1: 'უძრავი ქონება', routerLink1: '/allCards' },
       
          
        ],
      }



For={
  text: 'გარიგების ტიპი',
  optdisplay:[ 'იყიდება','ქირავდება',  'გირავდება', 'ქირავდება ყოველდღიურად', 'მშენებარე ბინები'],

}
allFilter = {
  translated: {
    SortBy: 'დალაგება:',
    activeEl: 'ყველაზე გაყიდვადი',
    sortingOptions: [
      { name: 'ყველაზე გაყიდვადი', state: true },
      { name: 'ყველაზე ნახვადი', state: false },
      { name: 'ფასი: ზრდადობით', state: false },
      { name: 'ფასი: კლებადობით', state: false }
    ],
    results: 'ძებნის შედეგები',
    view: 'ბადის ხედი',
    list: 'სიის ხედი',  
    home: 'მთავარი',
    homeL: '/განცხადებები'
  },
  FirstFilter: {
    locations: ['Tbilisi', 'Batumi', 'Kutaisi', 'Rustavi', 'Zugdidi', 'Telavi', 'Bakuriani', 'Kobuleti','Gori','Poti','Marneuli','Khashuri','Samtredia','Zestaponi','Akhaltsikhe','Senaki','Ozurgeti','Kaspi','Chiatura','Gardabani','Borjomi','Sagarejo','Kvareli','Bolnisi','Tkibuli','Khoni','Tskaltubo','Akhalkalaki','Mtskheta','Gurjaani','Dusheti',
     'Lanchkhuti','Lagodekhi','Sachkhere','Dedoplistskaro','Abasha','Martvili','Ninotsminda','Tsalka','Vani','Dmanisi','Tsalenjikha', 'Keda'],
    locationDis: ['თბილისი', 'ბათუმი', 'ქუთაისი', 'რუსთავი', 'ზუგდიდი', 'თელავი', 'ბაკურიანი', 'ქობულეთი','	გორი','ფოთი','მარნეული','ხაშური','სამტრედია','ზესტაფონი','ახალციხე','სენაკი','ოზურგეთი','კასპი','ჭიათურა','გარდაბანი','ბორჯომი','საგარეჯო','ყვარელი','ბოლნისი','ტყიბული','ხონი','წყალტუბო','ახალქალაქი','მცხეთა','გურჯაანი','დუშეთი',
      'ლანჩხუთი','ლაგოდეხი','საჩხერე','დედოფლისწყარო','აბაშა','მარტვილი','ნინოწმინდა','წალკა','ვანი','დმანისი','წალენჯიხა','ქედა'
    ],

    PropertyTypes:  ['Apartment', 'House','country House','Land Plot','Commercial', 'Hotel'],    
  
    PropertyTypesDis: ['ბინა', 'კერძო სახლი', 'აგარაკი','მიწის ნაკვეთი','კომერციული','სასტუმრო'],
  },
  filter: {
    SelectInputs: [
      {
        imgLink: '../../../assets/Imges/StaticImg/StaticIcons/sleeping.png',
        text: 'საძინებელი',
        options: ['საძინებელი', '1', '2', '3', '4', '5', '6', '7'],
        name: 'bedrooms',
      },
      {
        imgLink: '../../../assets/Imges/StaticImg/StaticIcons/bathtub.svg',
        text: 'სააბაზანო',
        options: ['სააბაზანო', '1', '2', '3', '4', '5'],
        name: 'bathrooms',
      },
    ],
    range: {
      area: 'ფართობი',
      MAmount: 'კვ.მ',
      Price: 'ფასის დიაპაზონი'
    },
    filteredCheckBox: [
      { id: '1', label: 'Air Conditioning', name: 'კონდინციონერი', formcontroller: 'airConditioning' },
      { id: '2', label: 'Swimming Pool', name: 'აუზი', formcontroller: 'swimmingPool' },
      { id: '3', label: 'TV Cable & wifi', name: 'ტელევიზია და ინტერნეტი', formcontroller: 'tvCable' },
      { id: '4', label: 'Central Heating', name: 'ცენტრალური გათბობა', formcontroller: 'centralHeating' },
      { id: '5', label: 'Laundry Room', name: 'სარეცხი ოთახი', formcontroller: 'laundryRoom' },
      { id: '6', label: 'Microwave', name: 'მიკროტალღური ღუმელი', formcontroller: 'microwave' },
      { id: '7', label: 'Gym', name: 'სპორტული დარბაზი', formcontroller: 'gym' },
      { id: '8', label: 'Alarm', name: 'სიგნალიზაცია', formcontroller: 'alarm' },
      { id: '9', label: 'Refrigerator', name: 'მაცივარი', formcontroller: 'refrigerator' },
      { id: '10', label: 'Window Covering', name: 'აივანი', formcontroller: 'windowCovering' },

      {  label: 'sardafi', name: 'სარდაფი', id: '11', formcontroller: 'sardafi'},
      { label: 'lifti', name: 'ლიფტი', id: '12', formcontroller: 'lifti' },
      { label: 'garage',   name: 'გარაჟი', id: '13', formcontroller: 'garage' },
      { label: 'bolo_sartuli',  name: 'ბოლო სართული', id: '14',formcontroller: 'bolo_sartuli' },
      {  label: 'bunebrivi_airi',  name: 'ბუნებრივი აირი', id: '15',formcontroller: 'bunebrivi_airi' },
      {   label: 'satavso', name: 'სათავსო', id: '16', formcontroller: 'satavso' },
    ],
  },
  

}

Registration = {
  confirmation: { text: 'თქვენ წარმატებით დარეგისტრირდით', show: false },
  mainInputs: [
    { FormControlName: 'saxeli', labelText: 'სახელი*', For: "firstNameReg", type: 'text', errortext: 'სახელი აუცილებელია.', chack: false },
    { FormControlName: 'gvari', labelText: 'გვარი*', For: "lastNameReg", type: 'text', errortext: 'გვარი აუცილებელია.', chack: false },
    { FormControlName: 'maili', labelText: 'ელფოსტა*', For: "emailReg", type: 'email', errortext: 'ელფოსტა აუცილებელია.', chack: false },
    { FormControlName: 'paroli', labelText: 'პაროლი*', For: "passwordReg", type: 'password', errortext: 'პაროლი აუცილებელია.', chack: false },
    { FormControlName: 'paroliRepeat', labelText: 'გაიმეორეთ პაროლი*', For: "repeatPasswordReg", type: 'password', errortext: 'პაროლები უნდა ემთხვეოდეს.', chack: true },
  ],
  register: {
    buttonText: 'რეგისტრაცია',
    mobile: 'მობილურის ნომერი*',
    notification: 'ვერიფიკაცია წარმატებით დასრულდა',
    Codeerror: 'კოდი არასწორია',
    GError: 'გთხოვთ აირჩიოთ სქესი',
    numbererror: 'ჩაწერეთ თქვენი ტელეფონის ნომერი',
    Hgender: 'სქესი*',
    Man: 'მამრობითი',
    Fam: 'მდედრობითი',
    agree:'ვეთანხმები',
    terms:' წესები და პირობები',
    codeHolder: 'შეიყვანეთ ტელეფონზე მიღებული კოდი',
    respErrorNumber: 'ტელეფონის ნომერი არასწორია',
    respErrorEmail: 'ეს ელფოსტა უკვე გამოყენებულია',
    respErrorEmailInvalid: 'ელფოსტა არასწორია',
    respErrorServer: 'სერვერის პრობლემა, სცადეთ მოგვიანებით.',
  },
  login: {
    inputs: [
      { FormControlName: 'maili', labelText: 'შეიყვანეთ  ელფოსტა*', For: "firstNameLogin", type: 'text', errortext: 'შეიყვანეთ მომხმარებლის  ელფოსტა.',  },
      { FormControlName: 'paroli', labelText: 'პაროლი*', For: "passwordLogin", type: 'password', errortext: 'პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს.',  },
    ],
    button: 'შესვლა',
    remember: 'დამახსოვრება',
    forget: 'დაგავიწყდა პაროლი ?',
  }
};


  constructor() { }
}
