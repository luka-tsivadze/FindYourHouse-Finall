import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AllCardsService } from '../Services/all-cards/all-cards.service';
import { Router } from 'express';
import { isPlatformBrowser } from '@angular/common';
import { LoadingServiceService } from '../Services/LoadingServ/loading-service.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit{

  loaded = false;

  constructor(private appService:LoadingServiceService){
    
  }

  ngOnInit(): void {
    this.appService.loading$.subscribe(loading => {
      this.loaded = loading;
    });
  }


}