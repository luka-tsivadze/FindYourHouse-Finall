import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';

import { ListingParentComponent } from './ListingPageComponents/listing-parent/listing-parent.component';

import { ErrorPageComponent } from './error-page/error-page.component';
import { MainCardsComponent } from './CardPage/main-cards/main-cards.component';
import { DetailedInfoParentComponent } from './DetailedInfo/detailed-info-parent/detailed-info-parent.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { authGuard } from './auth.guard';
import { CardsResolverGuard } from './Guards/card-resolver-guard.guard';
import { TermsAndConditionsComponent } from './Components/terms-and-conditions/terms-and-conditions.component';

import { AgentsDetailedComponent } from './main-page/agents-detailed/agents-detailed.component';
import { CompaniesComponent } from './companies/companies.component';
import { ForgotPasswordComponent } from './Components/registration/forgot-password/forgot-password.component';
import { PrivacePolicyComponent } from './Components/privace-policy/privace-policy.component';
import { DeletePolicyComponent } from './Components/privace-policy/delete-policy/delete-policy.component';
const routes: Routes = [ 

  { path: '', component:MainPageComponent, resolve: { data: CardsResolverGuard } },
  { path: 'Home', component:MainPageComponent},
  {path: 'Listing', component:ListingParentComponent ,canActivate: [authGuard], resolve: { data: CardsResolverGuard }},
  {path: 'allCards', component:MainCardsComponent, resolve: { data: CardsResolverGuard }},
  {path: 'allCards/:id', component:DetailedInfoParentComponent, resolve: { data: CardsResolverGuard }},
  {path: 'contact', component:ContactComponent},
  {path: 'about', component:AboutUsComponent},
  {path:'terms-and-conditions', component:TermsAndConditionsComponent},
  {path:'Agent', component:AgentsDetailedComponent},
  {path:'Companies', component:CompaniesComponent},
  {path:'PasswordRecovery', component:ForgotPasswordComponent},
  {path:'Privacy-Policy', component:PrivacePolicyComponent},
  {path:'DeletePolicy', component:DeletePolicyComponent},
  {path: '**', component:ErrorPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
