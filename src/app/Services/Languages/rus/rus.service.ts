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
  pFP: 'Компания, представляющая наши интересы.', 
  NavFooter: 'Навигация', 

  NewsFooter: 'Информационная рассылка', 
  NewsFooterText: 'Подпишитесь на нашу информационную рассылку, чтобы получать последние обновления и предложения. Подпишитесь, чтобы получать новости на свою почту.', 
  NewsFooterBtn: 'ПОДПИСАТЬСЯ', 
  NewsFooterPlaceHolder: 'Введите ваш email',
      terms:'Условия и положения',
     Policy:'Политика конфиденциальности',
}
For={
  text: 'Статус недвижимости',
  optdisplay:[ 'Продается', 'Сдается в аренду', 'Залог', 'Аренда посуточно', 'Строящиеся квартиры'],
}
allFilter = {
  FirstFilter: {
    locations: ['Tbilisi', 'Batumi', 'Kutaisi', 'Rustavi', 'Zugdidi', 'Telavi', 'Bakuriani', 'Kobuleti','Gori','Poti','Marneuli','Khashuri','Samtredia','Zestaponi','Akhaltsikhe','Senaki','Ozurgeti','Kaspi','Chiatura','Gardabani','Borjomi','Sagarejo','Kvareli','Bolnisi','Tkibuli','Khoni','Tskaltubo','Akhalkalaki','Mtskheta','Gurjaani','Dusheti',
      'Lanchkhuti','Lagodekhi','Sachkhere','Dedoplistskaro','Abasha','Martvili','Ninotsminda','Tsalka','Vani','Dmanisi','Tsalenjikha', 'Keda'],
    locationDis: ['Тбилиси', 'Батуми', 'Кутаиси', 'Рустави', 'Зугдиди', 'Телави', 'Бакуриани', 'Кобулети','Гори','Поти','Марнеули','Хашури','Самтредиа','Зестапони','Ахалцихе','Сенакь','Озургети','Каспи','Чиатура','Гардабани','Боржоми','Сагареджо','Кварели','Болниси','Ткибули','Хони','Цкалтоубо','Ахалкалаки','Мцхета','Гурджаани','Душети',
      'Ланчхуте','Лагодехи','Сачхере','Дедоплисцкаро','Абаша','Мартвили','Ниноцминда','Цалка','Вани','Дманиси','Цаленджиха', 'Кеда'],

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
      { id: '1', label: 'Air Conditioning', name: 'Кондиционер', formcontroller: 'airConditioning' },
      { id: '2', label: 'Swimming Pool', name: 'Бассейн', formcontroller: 'swimmingPool' },
      { id: '3', label: 'TV Cable & wifi', name: 'Телевидение и интернет', formcontroller: 'tvCable' },
      { id: '4', label: 'Central Heating', name: 'Центральное отопление', formcontroller: 'centralHeating' },
      { id: '5', label: 'Laundry Room', name: 'Прачечная', formcontroller: 'laundryRoom' },
      { id: '6', label: 'Microwave', name: 'Микроволновая печь', formcontroller: 'microwave' },
      { id: '7', label: 'Gym', name: 'Спортзал', formcontroller: 'gym' },
      { id: '8', label: 'Alarm', name: 'Сигнализация', formcontroller: 'alarm' },
      { id: '9', label: 'Refrigerator', name: 'Холодильник', formcontroller: 'refrigerator' },
      { id: '10', label: 'Window Covering', name: 'Балкон', formcontroller: 'windowCovering' },

      {label: 'sardafi', name:'basement', id: '11', formcontroller: 'sardafi'},
      { label: 'lifti',  name:'Elavator', id: '12', formcontroller: 'lifti' },
      { label: 'garage',  name:'Garage', id: '13',  formcontroller: 'garage' },
      { label: 'bolo_sartuli',  name:'Top Floor', id: '14',  formcontroller: 'bolo_sartuli' },
      { label: 'bunebrivi_airi', name:'Natural gas' , id: '15', formcontroller: 'bunebrivi_airi' },
      { label: 'satavso',  name:'Storage',  id: '16',  formcontroller:'satavso' },
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
