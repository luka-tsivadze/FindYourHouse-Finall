import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';


import { ErrorPageComponent } from './error-page/error-page.component';
import { MainCardsComponent } from './CardPage/main-cards/main-cards.component';
import { DetailedInfoParentComponent } from './DetailedInfo/detailed-info-parent/detailed-info-parent.component';

import { authGuard } from './auth.guard';
import { CardsResolverGuard } from './Guards/card-resolver-guard.guard';


import { loggedInGuard } from './Guards/logged-in/logged-in.guard';
import { DelayPreloadStrategy } from './delay-preload.strategy';
const routes: Routes = [ 

  { path: '', component:MainPageComponent, resolve: { data: CardsResolverGuard } },
  { path: 'Home', component:MainPageComponent},
  {path: 'Listing', loadChildren: () => import('./Modules/listing/listing-module').then(m => m.ListingModule)
    ,canActivate: [authGuard], resolve: { data: CardsResolverGuard }},
  {path: 'allCards', loadChildren: () => import('./Modules/all-cards/all-cards.module').then(m => m.AllCardsModule), resolve: { data: CardsResolverGuard }, },
  {path: 'allCards/:id', component:DetailedInfoParentComponent, resolve: { data: CardsResolverGuard }},
  {path: 'contact', loadChildren: () => import('./Modules/contact/contact.module').then(m => m.ContactModule)},

{
  path: 'about',
  loadChildren: () => import('./Modules/about/about.module').then(m => m.AboutModule)
},



  {path:'terms-and-conditions',
    loadChildren: () => import('./Modules/tac/tac.module').then(m => m.TACModule)
  },
  {path:'Agent',
    loadChildren: () => import('./Modules/agent/agent.module').then(m => m.AgentModule) 
    },
  {path:'Companies',loadChildren:() => import('./Modules/companies/companies.module').then(m => m.CompaniesModule)},

  {path:'Privacy-Policy', 
    loadChildren: () => import('./Modules/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
  },
  {path:'DeletePolicy', 
    loadChildren: () => import('./Modules/del-policy/del-policy.module').then(m => m.DelPolicyModule)
  },
  {path:'login', 
    loadChildren:() => import('./Modules/login/login.module').then(m => m.LoginModule),
    canActivate:[loggedInGuard]
  },
  {path:'Registration', loadChildren:() => import('./Modules/reg/reg.module').then(m => m.RegModule), canActivate:[loggedInGuard]
  },

  {path: '**', component:ErrorPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy: DelayPreloadStrategy })],
   providers: [DelayPreloadStrategy] ,
  exports: [RouterModule]
})
export class AppRoutingModule { }

