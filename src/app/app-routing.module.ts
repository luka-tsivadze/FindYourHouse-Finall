import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';

import { ListingParentComponent } from './ListingPageComponents/listing-parent/listing-parent.component';

import { ErrorPageComponent } from './error-page/error-page.component';
import { MainCardsComponent } from './CardPage/main-cards/main-cards.component';
import { DetailedInfoParentComponent } from './DetailedInfo/detailed-info-parent/detailed-info-parent.component';
import { ContactComponent } from './contact/contact.component';

import { authGuard } from './auth.guard';
import { CardsResolverGuard } from './Guards/card-resolver-guard.guard';
import { TermsAndConditionsComponent } from './Components/terms-and-conditions/terms-and-conditions.component';

import { AgentsDetailedComponent } from './main-page/agents-detailed/agents-detailed.component';
import { CompaniesComponent } from './companies/companies.component';

import { PrivacePolicyComponent } from './Components/privace-policy/privace-policy.component';
import { DeletePolicyComponent } from './Components/privace-policy/delete-policy/delete-policy.component';

import { LoginComponent } from './Components/login/login.component';
import { RegPageComponent } from './Components/reg-page/reg-page.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { loggedInGuard } from './Guards/logged-in/logged-in.guard';
const routes: Routes = [ 

  { path: '', component:MainPageComponent, resolve: { data: CardsResolverGuard } },
  { path: 'Home', component:MainPageComponent},
  {path: 'Listing', component:ListingParentComponent ,canActivate: [authGuard], resolve: { data: CardsResolverGuard }},
  {path: 'allCards', component:MainCardsComponent, resolve: { data: CardsResolverGuard }},
  {path: 'allCards/:id', component:DetailedInfoParentComponent, resolve: { data: CardsResolverGuard }},
  {path: 'contact', loadChildren: () => import('./Modules/contact/contact.module').then(m => m.ContactModule)},

{
  path: 'about',
  loadChildren: () => import('./Modules/about/about.module').then(m => m.AboutModule)
},



  {path:'terms-and-conditions', component:TermsAndConditionsComponent},
  {path:'Agent', component:AgentsDetailedComponent},
  {path:'Companies', component:CompaniesComponent},
  {path:'PasswordRecovery', component:ForgotPasswordComponent},
  {path:'Privacy-Policy', component:PrivacePolicyComponent},
  {path:'DeletePolicy', component:DeletePolicyComponent},
  {path:'login', component:LoginComponent  , canActivate:[loggedInGuard]},
  {path:'Registration', component:RegPageComponent , canActivate:[loggedInGuard] },

  {path: '**', component:ErrorPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

