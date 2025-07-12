import { Injectable, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NavInfoService {
  MenuBar = {
    Home: [  ],
    Property: [ ],
    Pages: [ 
      { a: 'User Panel',chack:'User Panel', Showimg: true,  RouterLink: '/Listing', subText: [ {text:'Dashboard',value:'Dashboard'},
        { text:'Profile',value:'Profile' }, {text:'My Properties',value:'My Properties'}, { text:'Favorited Properties',value:'Favorited Properties'} ,
         {text:'Add Property',value:'Add Property'} ,{text:'Payments',value:'Payments'},{text:'Change Password',value:'Change Password'}] },
      { a: 'Login', chack:'Login', Showimg: false },
      { a: 'Register',chack:'Register', Showimg: false, RouterLink: ''  },
      { a: 'About Us', Showimg: false, RouterLink: '/about' },
    ],
    Blog: [ 
      { a: 'text', Showimg: true, subText: ['text1', 'text2', 'text3'] },
      { a: 'text', Showimg: false },
      { a: 'text', Showimg: false }
    ],
    profileSettings:[
      { Text:'Add Property',value:'Add Property'},
      {Text:'My Properties', value:'My Properties'},
      {Text:'Favorited Properties', value:'Favorited Properties'},
      { Text:'Edit Profile', value:'Edit Profile', routes:''},
      ,{Text:'Payments', value:'Payments' },{Text:'Change Password', value:'Change Password'},{Text:'Log Out',value:'Log Out'}]
  };

  IsSignedIn = { signed: false,
     imgLink: '../../assets/Imges/NavImg/man.png', Name: 'Not Recieved' ,number:''
      ,email:'NotRecieved@gmail.com' ,gender:'' ,code:'', location:'' ,type:'',
      AboutMe:'',
      links: { facebook: '', instagram: '', telegram: '' ,linkdIn:'', whatsapp:''},
      RegisterCompany:'',
    };
  public userData$ = new BehaviorSubject(this.IsSignedIn);
  Languages = ['ENG', 'RUS', 'GEO'];
  LanguageIcons=['../../assets/Imges/StaticImg/StaticIcons/united-kingdom.png','../../assets/Imges/StaticImg/StaticIcons/russia.png','../../assets/Imges/StaticImg/StaticIcons/georgia.png']

  chosenLang: string | undefined; //სერვისში გამოუსადეგარია 
  scrollobser = new BehaviorSubject<boolean>(false);
  
userId;
FromPopup$=new BehaviorSubject<boolean>(false);
CodePage=this.FromPopup$ as Observable<boolean>;


  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
    if (isPlatformBrowser(this.platformId)) {
    
      this.userId = localStorage.getItem('id');
      if (this.userId) {
        this.IsSignedIn.signed = true;

        if (localStorage.getItem('activeElement')=='Log Out'){
          localStorage.removeItem('id');
        }
      }
      this.MenuBar.Pages.forEach((element) => {

         if(this.IsSignedIn){
            if(element.a=='user Panel'){
              element.RouterLink='Listing';
            }

         }
      });
      if(localStorage.getItem('Language')){
        this.chosenLang = localStorage.getItem('Language');
        
      }
    }

  }

  updateScrollStatus(status: boolean) {
    this.scrollobser.next(status);  // Update the value

  }
counter = 0;

  getUserInfo(userId?: string ,callonce?:boolean ): Observable<any> {

    if (userId === undefined) {
      userId = this.userId; 
       localStorage.setItem('id',userId)// Use the service's userId if not provided
    }
    if (!isPlatformBrowser(this.platformId)) {
      return of(null); // Return empty observable if not in browser
    }
    if(callonce && this.counter > 0){
      return of(this.IsSignedIn); // Prevent multiple calls
    }
    this.counter++;

    const localUserId = localStorage.getItem('id');
    const resolvedUserId = userId || localUserId;

    if (!resolvedUserId) {
      
      return of(null); // Return empty observable if no userId
    }

    const body = { id: resolvedUserId };

    return this.http.post<any>('get_user_data.php', body).pipe(
      tap((data: any) => {
        if (!data || data.length === 0) return;

      
        
      
        this.IsSignedIn.Name = data[0] && data[0].saxeli && data[0].gvari ? `${data[0].saxeli} ${data[0].gvari}` : '';
        this.IsSignedIn.number = (data[0] && data[0].nomeri && data[0].nomeri !== 'null' && data[0].nomeri !== null) ? data[0].nomeri : '';
        this.IsSignedIn.email = data[0] && data[0].maili ? data[0].maili : '';
        this.IsSignedIn.gender = data[0] && data[0].sqesi ? data[0].sqesi : '';
        this.IsSignedIn.code = data[0] && data[0].saidentifikacio_kodi ? data[0].saidentifikacio_kodi : '';
        this.IsSignedIn.location = data[0] && data[0].sacxovrebeli_adgili ? data[0].sacxovrebeli_adgili : '';
        this.IsSignedIn.type = data[0] && data[0].angarishis_tipi ? data[0].angarishis_tipi : 'User';
        this.IsSignedIn.AboutMe = (data[0] && data[0].chems_shesaxeb !== null && data[0].chems_shesaxeb !== 'null') ? data[0].chems_shesaxeb : '';
        
        this.IsSignedIn.links.facebook = data[0] && data[0].facebook_linki ? data[0].facebook_linki : '';
        this.IsSignedIn.links.instagram = data[0] && data[0].instagram_linki ? data[0].instagram_linki : '';
        this.IsSignedIn.links.telegram = data[0] && data[0].telegram_linki ? data[0].telegram_linki : '';
        this.IsSignedIn.links.linkdIn = data[0] && data[0].linkedin_linki ? data[0].linkedin_linki : '';  
        this.IsSignedIn.links.whatsapp = data[0] && data[0].whatsapp_linki ? data[0].whatsapp_linki : '';
        this.IsSignedIn.RegisterCompany = data[0] && data[0].angarishis_momwodebeli ? data[0].angarishis_momwodebeli : '';

        if (data[0].foto && data[0].foto !== 'undefined' && data[0].foto !== null && data[0].foto !== '' && data[0].foto !== 'NULL') {
          this.IsSignedIn.imgLink = `users/${data[0].maili}/${data[0].saidentifikacio_kodi}/${data[0].foto}`;
        } else if (data[0].sqesi === 'male'|| data[0].sqesi === 'kaci') {
          this.IsSignedIn.imgLink = '../../assets/Imges/NavImg/man.png';
        } else if (data[0].sqesi === 'famale' || data[0].sqesi === 'qali') {
          this.IsSignedIn.imgLink = '../../assets/Imges/NavImg/girl.png';
        }else{
          this.IsSignedIn.imgLink = '../../assets/Imges/NavImg/man.png';
        }

        // Update observable for other components that might be listening
        this.userData$.next(this.IsSignedIn);
      }),
      catchError(error => {
        console.error('Error fetching user info', error);
        return of(null); // Return empty observable on error
      })
    );
  }
  
  
  
}
