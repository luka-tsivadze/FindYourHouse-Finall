import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RusService {
  MenuBar = {
    Home: [  ],
    Property: [ ],
    Pages: [ 
      { a: 'Панель пользователя',chack:'User Panel', Showimg: true, RouterLink: '/Listing', subText: [ {text: 'Панель управления', value: 'Dashboard'},
        { text: 'Профиль', value: 'Profile' }, {text: 'Моя собственность', value: 'My Properties'}, { text: 'Избранная собственность', value: 'Favorited Properties'},
        {text: 'Добавить собственность', value: 'Add Property'} ,{text: 'Платежи', value: 'Payments'},{text: 'Изменить пароль', value: 'Change Password'}] },
      { a: 'Войти',chack:'Login', Showimg: false },
      { a: 'Регистрация', chack:'Register', Showimg: false, RouterLink: ''  },
      { a: 'О нас', Showimg: false, RouterLink: '/about' },
    ],
    Blog: [ 
      { a: 'Текст', Showimg: true, subText: ['Текст 1', 'Текст 2', 'Текст 3'] },
      { a: 'Текст', Showimg: false },
      { a: 'Текст', Showimg: false }
    ],
    profileSettings: [
      { Text: 'Добавить недвижимость', value: 'Add Property' },
      {Text: 'Моя собственность', value: 'My Properties'},
      {Text: 'Избранная собственность', value: 'Favorited Properties'},
      { Text: 'Редактировать профиль', value: 'Edit Profile', routes: '' },
      { Text: 'Платежи', value: 'Payments' },
      { Text: 'Сменить пароль', value: 'Change Password' },
      { Text: 'Выйти', value: 'Log Out' }
    ]
    
  };
  
NavR={Home:'дом' ,
  Property:' недвижимость', Pages:'Страницы',Blog:'Блог',
  companies:'Компании',
  Contact:'Контакт',SignIn:'Регистрация', AddListing:'Добавить запись'
}
Header = {
  FindYourHouse: 'Найди свою мечту ',
  weHaveOverMillion: 'У нас есть более миллиона объектов недвижимости для вас',

  status:['В аренду','На продажу','Приносить присягу','Арендуется посуточно','Квартиры в стадии строительства'],
  location: 'Местоположение',
  KayWord: 'Введите ключевое слово..',
  propertyType: 'Тип недвижимости',
  Advanced: 'Расширенный поиск',
  Search: 'Искать сейчас'
}
popularPlaces={Header:'Популярные места' ,properties:' Недвижимость в самых популярных местах',prop:"свойство"}
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
  Header: 'Рекомендуемая недвижимость',
  properties: 'Недвижимость в самых популярных местах',
  featured: 'Рекомендуемая',
  For: 'На продажу',
  BedRooms: 'Спальни',
  BathRooms: 'Ванные комнаты',
  Garage: 'Гаражи',
  Area: 'кв. м',
  ViewDetails: 'Посмотреть детали'
}
main = {
  WhyChooseUs: 'Почему мы', 
  everyStep: 'Мы предлагаем полный сервис на каждом этапе', 
  
  popularPropertys: 'Откройте для себя популярные объекты', 
  AgentsH: 'Познакомьтесь с нашими агентами', 
  AgentsP: 'Мы всегда готовы помочь вам', 
  AgentsB:' Узнать больше',
  Agents:'Объект',
  RHeader: 'Отзывы клиентов', 
  Rptext: 'Мы собираем отзывы от наших клиентов.'
}
  SFooter = {
    headerFP: 'Наши партнеры',
    pFP: 'Компании, которые нас представляют.',
    NavFooter: 'Навигация',
    NewsFooter: 'Новости',
    NewsFooterText: 'Подпишитесь на нашу рассылку, чтобы получать последние обновления и предложения. Получайте новости на вашу почту.',
    NewsFooterBtn: 'ПОДПИСАТЬСЯ',
    NewsFooterPlaceHolder: 'Введите ваш email',
    errorSubscribe: 'Ваш email не был добавлен, пожалуйста, попробуйте еще раз',
    terms: 'Условия и положения',
    Policy: 'Политика конфиденциальности',
    NewsFooterRequired: 'Поле электронной почты обязательно',
    succesSubscribe: 'Ваш email успешно добавлен',
    NewsFooterInvalid: 'Пожалуйста, введите корректный email',
  };

  FooterData = {
    FindHouse: {
      mainText: 'Новый портал для покупки, продажи и аренды недвижимости в Грузии',
      location: 'Грузия',
      Number: '+995 32 21 14 844',
      Email: 'infofindhous@gmail.com'
    },
    Navigation: [
      { list1: 'Главная', routerLink1: '/' },
      { list1: 'Недвижимость', routerLink1: '/allCards' },
      { list1: 'Связаться с нами', routerLink1: '/contact' },
      { list1: 'О нас', routerLink1: '/about' },
    ],
  }
For={
  text: 'Статус недвижимости',
  optdisplay:[ 'Продается', 'Сдается в аренду', 'Залог', 'Аренда посуточно', 'Строящиеся квартиры'],
}
allFilter = {
  translated: {
    SortBy: 'Сортировать:',
    activeEl: 'Самые продаваемые',
    sortingOptions: [
      { name: 'Самые продаваемые', state: true },
      { name: 'Самые просматриваемые', state: false },
      { name: 'Цена: по возрастанию', state: false },
      { name: 'Цена: по убыванию', state: false }
    ],
    results: 'Результаты поиска',
    view: 'Вид сеткой',
    list: 'Вид списком',
    home: 'Главная',
    homeL: '/allCards'
  },
  FirstFilter: {
    locations: ['Tbilisi', 'Batumi', 'Kutaisi', 'Rustavi', 'Zugdidi', 'Telavi', 'Bakuriani', 'Kobuleti','Gori','Poti','Marneuli','Khashuri','Samtredia','Zestaponi','Akhaltsikhe','Senaki','Ozurgeti','Kaspi','Chiatura','Gardabani','Borjomi','Sagarejo','Kvareli','Bolnisi','Tkibuli','Khoni','Tskaltubo','Akhalkalaki','Mtskheta','Gurjaani','Dusheti',
      'Lanchkhuti','Lagodekhi','Sachkhere','Dedoplistskaro','Abasha','Martvili','Ninotsminda','Tsalka','Vani','Dmanisi','Tsalenjikha', 'Keda'],
    locationDis: ['Тбилиси', 'Батуми', 'Кутаиси', 'Рустави', 'Зугдиди', 'Телави', 'Бакуриани', 'Кобулети','Гори','Поти','Марнеули','Хашури','Самтредиа','Зестапони','Ахалцихе','Сенаки','Озургети','Каспи','Чиатура','Гардабани','Боржоми','Сагареджо','Кварели','Болниси','Ткибули','Хони','Цкалтубо','Ахалкалаки','Мцхета','Гурджаани','Душети',
      'Ланчхути','Лагодехи','Сачхере','Дедоплисцкаро','Абаша','Мартвили','Ниноцминда','Цалка','Вани','Дманиси','Цаленджиха', 'Кеда'],

    PropertyTypes:   ['Apartment', 'House','country House','Land Plot','Commercial', 'Hotel'],
    PropertyTypesDis: ['Квартира', 'Дом', 'Загородный дом','Земельный участок','Коммерческая недвижимость','Отель'],
  },
  filter: {
    SelectInputs: [
      {
        imgLink: '../../../assets/Imges/StaticImg/StaticIcons/sleeping.png',
        text: 'Спальня',
        options: ['Спальня', '1', '2', '3', '4', '5', '6', '7'],
        name: 'bedrooms',
      },
      {
        imgLink: '../../../assets/Imges/StaticImg/StaticIcons/bathtub.svg',
        text: 'Ванная',
        options: ['Ванная', '1', '2', '3', '4', '5'],
        name: 'bathrooms',
      },
    ],
    range: {
      area: 'Площадь',
      MAmount: 'кв.м',
      Price: 'Ценовой диапазон'
    },
    filteredCheckBox: [
      { id: '1', label: 'Кондиционер', name: 'Кондиционер', formcontroller: 'airConditioning' },
      { id: '2', label: 'Бассейн', name: 'Бассейн', formcontroller: 'swimmingPool' },
      { id: '3', label: 'Телевидение и интернет', name: 'Телевидение и интернет', formcontroller: 'tvCable' },
      { id: '4', label: 'Центральное отопление', name: 'Центральное отопление', formcontroller: 'centralHeating' },
      { id: '5', label: 'Прачечная', name: 'Прачечная', formcontroller: 'laundryRoom' },
      { id: '6', label: 'Микроволновая печь', name: 'Микроволновая печь', formcontroller: 'microwave' },
      { id: '7', label: 'Спортзал', name: 'Спортзал', formcontroller: 'gym' },
      { id: '8', label: 'Сигнализация', name: 'Сигнализация', formcontroller: 'alarm' },
      { id: '9', label: 'Холодильник', name: 'Холодильник', formcontroller: 'refrigerator' },
      { id: '10', label: 'Балкон', name: 'Балкон', formcontroller: 'windowCovering' },

      {label: 'Подвал', name:'Подвал', id: '11', formcontroller: 'sardafi'},
      { label: 'Лифт',  name:'Лифт', id: '12', formcontroller: 'lifti' },
      { label: 'Гараж',  name:'Гараж', id: '13',  formcontroller: 'garage' },
      { label: 'Верхний этаж',  name:'Верхний этаж', id: '14',  formcontroller: 'bolo_sartuli' },
      { label: 'Природный газ', name:'Природный газ' , id: '15', formcontroller: 'bunebrivi_airi' },
      { label: 'Кладовая',  name:'Кладовая',  id: '16',  formcontroller:'satavso' },
    ],
  },
}

Registration = {
 
  confirmation:{ text:'Вы успешно зарегистрировались', show:false},

  mainInputs: [
    { FormControlName: 'saxeli', labelText: 'Имя*', For: "firstNameReg", type: 'text', errortext: 'Имя обязательно.', chack: false },
    { FormControlName: 'gvari', labelText: 'Фамилия*', For: "lastNameReg", type: 'text', errortext: 'Фамилия обязательна.', chack: false },
    { FormControlName: 'maili', labelText: 'Электронная почта*', For: "emailReg", type: 'email', errortext: 'Электронная почта обязательна.', chack: false },
    { FormControlName: 'paroli', labelText: 'Пароль*', For: "passwordReg", type: 'password', errortext: 'Пароль обязателен.', chack: false },
    { FormControlName: 'paroliRepeat', labelText: 'Повторите пароль*', For: "repeatPasswordReg", type: 'password', errortext: 'Пароли должны совпадать.', chack: true },
  ],
  register: {
    buttonText: 'Регистрация',
    mobile: 'Мобильный номер*',
    notification: 'Верификация успешно завершена',
    Codeerror: 'Код неверен',
    GError: 'Выбор пола обязателен',
    numbererror: 'Введите свой номер телефона',
    Hgender: 'Пол*',
    Man: 'Мужской',
    Fam: 'Женский',
    agree:'Я согласен',
    terms:' с условиями и положениями',
    codeHolder: 'Введите код, полученный на телефон',
    respErrorNumber: 'Неверный номер телефона',
    respErrorEmail: 'Этот email уже используется',
    respErrorEmailInvalid: 'Неверный email',
    respErrorServer: 'Проблема с сервером, попробуйте позже.',
  },
  login: {
    inputs: [
      { FormControlName: 'maili', labelText: '  email*', For: "firstNameLogin", type: 'text', errortext: 'Введите email.' },
      { FormControlName: 'paroli', labelText: 'Пароль*', For: "passwordLogin", type: 'password', errortext: 'Пароль должен содержать не менее 6 символов.'},
    ],
    button: 'Войти',
    remember: 'Запомнить меня',
    forget: 'Забыли пароль?',
  }
};



  constructor() { }
}
