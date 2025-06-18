import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { text } from 'express';
import { error } from 'node:console';

@Injectable({
  providedIn: 'root',
})
export class GeoService {
  allForms = {
    form1info: {
      HeaderName1: 'პროექტის აღწერა და ფასი',
      firstTitle: 'ქონების სახელი',
      firstplaceHolder: 'შეიტანეთ თქვენი ქონების სახელი',

      secondTitle: 'მოკლე აღწერა',
      secondplaceHolder: 'აღწერეთ თქვენი პროდუქტი',

      firstselectName: 'გარიგების ტიპი',
      firstselect: [
        'იყიდება',
        'ქირავდება',
        'ქირავდება დღიურად',
        'გირავდება',
   
      ],
      firstselectValues: [
        'იყიდება',
        'ქირავდება',
        'ქირავდება დღიურად',
        'გირავდება',
      
      ],
      firstimgLinks:['','','',''],

      secondselectName: 'აირჩიე ქონების ტიპი',
      secondselect: ['ბინა', 'კერძო სახლი', 'აგარაკი','მიწის ნაკვეთი' ,'კომერციული', 'სასტუმრო'],
      secondselectValues: ['Apartment', 'House','country House.','Land Plot','Commercial', 'Hotel'],
      secondimgLinks:['','','','','',''],

      thirdselectName: 'ოთახების რაოდენობა',

      thirdTitle: 'ფასი',
      fourthTitle: 'ფართობი',

      HeaderName2: 'ქონების სურათები',
      HeaderName3: 'ქონების ვიდეო',
      HeaderName4: 'სართულის გეგმა',
      HeaderName5: 'ქონების მდებარეობა',
      HeaderName6: 'დამატებითი ინფორმაცია',
      HeaderName7: 'ქონების მახასიათებლები',
      HeaderName8: 'კონტაქტის ინფორმაცია',
      submit: 'განთავსება',
    },

    form4Info: [
      {
        id: 'Age',
        FormControlName: 'asaki',
        firstOption: 'აირჩიე ასაკი',
        options: [
          '0-1 წელი',
          '0-5 წელი',
          '0-10 წელი',
          '0-15 წელი',
          '0-20 წელი',
          '0-50 წელი',
          '50+ წელი',
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
        firstOption: 'საძინებელი',
        options: ['1', '2', '3', '4', '5', '6'],
        optionsValues: ['1', '2', '3', '4', '5', '6'],
        formControlName: 'sadzinebeli',
      },
      {
        id: 'bathroom',
        firstOption: 'სააბაზანო',
        options: ['1', '2', '3', '4', '5', '6'],
        optionsValues: ['1', '2', '3', '4', '5', '6'],
        formControlName: 'sveli_wertilebis_raodenoba',
      },
    ],
    City: {
      HeaderName: 'ქალაქი',
      placeHolder: 'შეიყვანეთ თქვენი ქალაქი',
      id: 'City',
      formControlName: 'qalaqi',
      type: 'text',
    },
    form3Info: [
      {
        HeaderName: 'მისამართი',
        placeHolder: 'შეიყვანეთ თქვენი მისამართი',
        id: 'adress',
        formControlName: 'misamarti',
        type: 'text',
      },

      // {
      //   HeaderName: 'Google Map გრძედი',
      //   placeHolder: 'შეიყვანეთ Google Map გრძედი',
      //   id: 'mapa',
      //   formControlName: 'mapis_grdzedi',
      //   type: 'number',
      // },
      // {
      //   HeaderName: 'Google Map განედი',
      //   placeHolder: 'შეიყვანეთ Google Map განედი',
      //   id: 'mapo',
      //   formControlName: 'mapis_ganedi',
      //   type: 'number',
      // },
    ],

    form5Info: [
      { text: 'კონდიციონერი', id: 'air', formControlName: 'kondincioneri' },
      { text: 'საცურაო აუზი', id: 'pool', formControlName: 'sacurao_auzi' },
      {
        text: 'ცენტრალური გათბობა',
        id: 'Heating',
        formControlName: 'centraluri_gatboba',
      },
      {
        text: 'სამრეცხაო ოთახი',
        id: 'room',
        formControlName: 'samrecxao_otaxi',
      },
      {
        text: 'სპორტული დარბაზი',
        id: 'gym',
        formControlName: 'sportuli_darbazi',
      },
      { text: 'სიგნალიზაცია', id: 'alarm', formControlName: 'signalizacia' },
      { text: 'აივანი', id: 'balcon', formControlName: 'aivani' },
      { text: 'მაცივარი', id: 'Refrigerator', formControlName: 'macivari' },
      { text: 'TV & WIFI', id: 'TV', formControlName: 'televizia_wifi' },
      {
        text: 'მიკროტალღური ღუმელი',
        id: 'Mic',
        formControlName: 'microtalguri',
      },
      
      {text: 'სარდაფი', id: 'basement', formControlName: 'sardafi'},
      { text: 'ლიფტი', id: 'lift', formControlName: 'lifti' },
      { text: 'გარაჟი', id: 'garage', formControlName: 'garage' },
      { text: 'ბოლო სართული', id: 'Floor', formControlName: 'bolo_sartuli' },
      { text: 'ბუნებრივი აირი', id: 'gas', formControlName: 'bunebrivi_airi' },
      { text: 'სათავსო', id: 'storage', formControlName: 'satavso' },
      
      
    ],
    NearByTranslate: {
      Header: 'მიმდებარე ობიექტები',
      placeholder: 'შეიყვანეთ ადგილის სახელი:',
      placeholderDist: 'მანძილი',
      sections: ['განათლება', 'ჯანმრთელობა და მედიცინა', 'ტრანსპორტი'],
      units:['km','meter'],
      unitstr:['კმ','მეტრი'],
      error: 'მაქსიმუმი 3 ადგილი არის დასაშვები',
    },

    form6Info: [
      {
        HeaderName: 'სახელი',
        placeHolder: 'შეიყვანეთ თქვენი სახელი',
        id: 'name6',
        formControlName: 'momxmareblis_saxeli',
      },

      {
        HeaderName: 'ელ.ფოსტა',
        placeHolder: 'შეიყვანეთ თქვენი ელ. ფოსტა',
        id: 'Email6',
        formControlName: 'el_fosta',
      },
      {
        HeaderName: 'ტელეფონი',
        placeHolder: 'შეიყვანეთ თქვენი ნომერი',
        id: 'Number6',
        formControlName: 'telefonis_nomeri',
      },
    ],
  };
  LeftInfo = [
    {
      icon: '../../../assets/Imges/StaticImg/StaticIcons/Location.svg',
      Text: 'მართვა',
      upText: 'Dashboard',
    },
    {
      icon: '../../../assets/Imges/StaticImg/StaticIcons/person-fill.svg',
      Text: 'პროფილი',
      upText: 'Profile',
    },
    {
      icon: '../../../assets/Imges/StaticImg/StaticIcons/list.svg',
      Text: 'ჩემი განცხადება',
      upText: 'My Properties',
    },

    {
      icon: '../../../assets/Imges/StaticImg/StaticIcons/heart-fill.svg',
      Text: 'ფავორიტი განცხადება',
      upText: 'Favorited Properties',
    },
    {
      icon: '../../../assets/Imges/StaticImg/StaticIcons/list.svg',
      Text: 'ატვირთე განცხადება',
      upText: 'Add Property',
    },
    {
      icon: '../../../assets/Imges/StaticImg/StaticIcons/business.svg',
      Text: 'ჩემი ბიზნესი',
      upText: 'My Business',
    },
    {
      icon: '../../../assets/Imges/StaticImg/StaticIcons/credit-card-fill.svg',
      Text: 'გადახდები',
      upText: 'Payments',
    },

    {
      icon: '../../../assets/Imges/StaticImg/StaticIcons/lock-fill.svg',
      Text: 'პაროლის შეცვლა',
      upText: 'Change Password',
    },
    {
      icon: '../../../assets/Imges/StaticImg/StaticIcons/log-out.svg',
      Text: 'გასვლა',
      upText: 'Log Out',
    },
  ];
  Dashboard = {
    dash_listing: {
      mainHeader: 'მართვა',
      headers: ['სახელი', 'თარიღი', 'რეიტინგი', 'სტატუსი', 'რედაქტირება'],
      status:['აქტიური', 'უმოქმედო'],
    },
    manage: {
      header: 'საინფორმაციო დაფის მართვა',
      cards: [
        { title: 'გამოქვეყნებული ქონება' },
        { title: 'მიმოხილვები' },
        { title: 'შეტყობინებები' },
        { title: 'დაჯავშნულის რაოდენობა' },
      ],
    },
    DashReview: {
      header: 'მიმოხილვა',
    },
    PersonalInfo: {
      staticElements: {
        Header: 'პერსონალური ინფორმაცია',
        updateBtn: 'განაახლეთ თქვენი პაროლი',
        submit: 'შენახვა',
        placeholder:'თქვენი პროფილის ბმული: ',
      },
      inputText: [
        {
          label: 'სახელი',
          placeholder: 'შეიყვანეთ თქვენი სახელი',
          FormControl: 'saxeli',
        },
        { label: 'გვარი', placeholder: 'შეიყვანეთ თქვენი გვარი' , FormControl:'gvari'},

        {
          label: 'ტელეფონის ნომერი',
          placeholder: 'მაგ: +1-800-7700-00',
          FormControl: 'nomeri',
        },
        {
          label: 'მისამართი',
          placeholder: 'დაწერეთ თქვენი მისამართი',
          FormControl: 'misamarti',
        },
      ],
      textArea: [
        {
          label: 'თქვენ შესახებ',
          placeholder: 'დაწერეთ თქვენ შესახებ',
          FormControlName: 'chems_shesaxeb',
        },
      ],
// "!"
UserSelect: [
  {
    label: 'ანგარიშის ტიპი',
    placeholder: 'აირჩიე ანგარიშის ტიპი',
    options: {
      dis: ['გაყიდვების მენეჯერი', 'მომხმარებელი'],
      val: ['gayidvebis_menejeri', 'momxmarebeli']
    },
    FormControlName: 'angarishis_tipi'
  },
  {
    label: 'სქესი',
    placeholder: 'აირჩიე სქესი',
    options: {
      dis: ['მამრობითი', 'მდედრობითი'],
      val: ['kaci', 'qali']
    },
    FormControlName: 'sqesi'
  }
],
Allnetworks: {
  Header: 'სოციალური ქსელები',
  elements: [
    { FormControlHref: 'facebook_linki', name: 'Facebook', value: 'Facebook' },
    { FormControlHref: 'instagram_linki', name: 'Instagram', value: 'Instagram' },
    { FormControlHref: 'telegram_linki', name: 'Telegram', value: 'Telegram' },
    { FormControlHref: 'linkedin_linki', name: 'LinkedIn', value: 'LinkedIn' },
    { FormControlHref: 'whatsapp_linki', name: 'WhatsApp', value: 'WhatsApp' }
  ]
}, 
UserMessage : {
  text: 'თქვენი ინფორმაცია წარმატებით განახლდა',
  error: false,
  ErrorText:'ატვირთვა ვერ მოხერხდა',
  fileSelected: false
},
Elements : {
  Header: 'ატვირთეთ პროფილის ფოტო',
  submit: 'შენახვა'
}


    },
  };
  Profile = {
    header: 'პროფილის დეტალები',
    inquary: 'შეტყობინების გაგზავნა',
    submit: 'გაგზავნა',
    input: ['სახელი', 'ტელეფონის ნომერი', 'ელ. ფოსტა'],
  };
  ChangePassword = {
    header: 'პაროლის შეცვლა',
    pas: 'მიმდინარე პაროლი',
    NewPas: 'ახალი პაროლი',
    ConfPas: 'დაადასტურეთ თქვენი პაროლი',
    submit: 'ცვლილებების გაგზავნა',
  };
  myProp = {
    Header: 'საუკეთესო ქონება',
    date: 'დამატების თარიღი',
    Views: 'ნახვები',
    action: 'მოქმედებები',
    rew: 'მიმოხილვები',
    Ed: 'რედაქტირება',
    prev: 'წინა',
    next: 'შემდეგი',
    ago: 'დღის წინ',
  };

  contact = {
    staticText: {
      header: 'კონტაქტი',
      headerH4: 'მთავარი  /  კონტაქტი',
      Mes: 'შეტყობინება',
      sub: 'გაგზავნა',
      cd: 'საკონტაქტო დეტალები',
      cp: 'გთხოვთ იხილოთ დეტალები ქვემოთ, დაგვიკავშირდით დღესვე!',
    },
    inputs: [
      { placeholder: 'სახელი', type: 'text', FormControlname: 'saxeli' },
      { placeholder: 'გვარი', type: 'text', FormControlname: 'gvari' },
      { placeholder: 'სათაური', type: 'text', FormControlname: 'satauri' },
      { placeholder: 'ელ. ფოსტა', type: 'email', FormControlname: 'maili' },
    ],
  
  };
  About = {
    headerH2: 'ჩვენს კომპანიაზე',
    headerH4: 'მთავარი / ჩვენ შესახებ',
    span1: 'ჩვენს ',
    span2: 'შესახებ',
    mainText: `ლორემ იპსუმ დოლორ სიტ ამეტ, კონსექტეტურ ადიპისიცინგ ელიტ. ლაბორუმ ოდიო იდ ვოლუპტატიბუს ინციდენტ კუმ? ათქუე კვაზი ეუმ დებიტის ოპტიო აბ. ესე იტაკე ოფიციის ტემპორა პოსიმუს ოდიო რუმ ავერიამ ratione, სუნტ. ლორემ იპსუმ დოლორ სიტ ამეტ, კონსექტეტურ ადიპისიცინგ ელიტ სუნტ.`,
    btn: 'წაიკითხე მეტი',
  };
  Webreview = {
    header: 'შეფასების დამატება',
    p: 'თქვენი შეფასება გვეხმარება საიტის  გაუმჯობესებაში',
    placeholderN: 'შეფასება',
    submit: 'გაგზავნა',
  }

  DetailedInfo = {
    advertismentr: 'რეკლამა',
    AgentsInfo: {
      inputs: [
        {
          type: 'text',
          placeholder: 'სახელი',
          formControlName: 'gamgzavnis_saxeli',
        },
        {
          type: 'text',
          placeholder: 'ტელეფონის ნომერი',
          formControlName: 'gamgzavnis_tel_nomeri',
        },
        {
          type: 'email',
          placeholder: 'ელ. ფოსტა',
          formControlName: 'gamgzavnis_maili',
        },
      ],
      staticValues: {
        h3: 'გაყიდვების მენეჯერი',
        p: 'ქონების აგენტი',
        Agentp:'გაყიდვების მენეჯერი',
        Userp:'ქონების მესაკუთრე',
        req: 'შეტყობინების გაგზავნა',
        submit: 'გაგზავნა',
        textArea: 'შეტყობინება',
      },

      
    },
    CardGallery1: 'გალერეა',
    unit: 'კვ.მ',
    parent: 'აღწერა',
    Featuredpr: {
      header: 'რჩეული განცხადებები',
      area: 'ფართობი',
      rooms: 'ოთახები',
      beds: 'საძინებლები',
    },
    Floorplan: 'სართულის გეგმა',
    leftAmenties: {
      h2: 'ქონების დეტალები',
      h2a: 'სერვისები',
      propstatic: [
        'ქონების ID',
        ' ქონების ტიპი',
        'ქონების სტატუსი',
        'ფასი',
        'ოთახები',
        'საძინებლები',
        'სააბაზანო',
        'ფართობი',
        'აშენების წელი',
      ],
    },
    map: 'ლოკაცია',
    near: 'რა არის ახლოს',
    propvideo: 'განცხადების ვიდეო',
    recentStatic: 'ბოლო განცხადებები',
    reviewAd: {
      header: 'მიმოხილვის დამატება',
      p: 'თქვენი შეფასება ამ განცხადებისთვის',
      placeholderN: 'მიმოხილვა',
      submit: 'გაგზავნა',
    },
    reviews: 'მიმოხილვა',
    scheduled: {
      header: 'ტურის დაგეგმვა',
      ad: 'ზრდასრული',
      ch: 'ბავშვი',
      submit: 'გაგზავნა',
    },
    simProp: 'მსგავსი ქონება',
    tagscomp: {
      header: 'პოპულარული ტეგები',
      Tags: [
        'სახლები',
        'რეალური სახლი',
        'სააბაზანოები',
        'საძინებლები',
        'გარაჟი',
        'ოჯახი',
        'უძრავი ქონება',
        'ქონება',
        'ლოკაცია',
        'ფასი',
      ],
    },
  };

  constructor() {}
}
