import { Component, Input, OnInit, Signal } from '@angular/core';

@Component({
  selector: 'app-ldescription',
  templateUrl: './ldescription.component.html',
  styleUrl: './ldescription.component.scss'
})
export class LDescriptionComponent implements OnInit {
  @Input() agent!: {
    status: number;
    imgLink: string;
    Name: string;
    mainalt: string;
    maili: string;
    nomeri: string;
    sacxovrebeli_adgili: string;
    chems_shesaxeb: string;
    idi: string | number;
  };

  constructor() { 

  }
  ngOnInit(): void {  }
}
