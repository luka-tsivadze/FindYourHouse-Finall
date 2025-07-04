import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-share-comp',
  templateUrl: './share-comp.component.html',
  styleUrl: './share-comp.component.scss'
})
export class ShareCompComponent  implements OnInit {
@Input() ElementInfo: any ;
@ViewChild('linkText') linkTextRef: ElementRef;
copyUrl='../../../assets/Imges/StaticImg/StaticIcons/copy-outline.svg'

ElementLink;

ngOnInit(): void {
  console.log(this.ElementInfo);
  if (this.ElementInfo.gncxdebis_idi) {
  this.ElementLink=`https://findhouse.ge/allCards/${this.ElementInfo.gncxdebis_idi}`;
  }else if (this.ElementInfo.id) {
  this.ElementLink=`https://findhouse.ge/allCards/${this.ElementInfo.id}`;
  }else{
    console.error('ElementInfo does not contain a valid identifier' , this.ElementInfo);
  }
}

copyToUrl() {
  this.copyUrl = '../../../assets/Imges/StaticImg/StaticIcons/checkmark-done-outline.svg';

  // 
  if (this.linkTextRef && this.linkTextRef.nativeElement) {
    const range = document.createRange();
    range.selectNodeContents(this.linkTextRef.nativeElement);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
  if (navigator.clipboard) {
    navigator.clipboard.writeText(this.ElementLink);
  } else {
    // fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = this.ElementLink;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}

sharetoFeb(){
alert('Facebook sharing is not implemented yet. Please try again later.');
}

shareWats(){
alert('WhatsApp sharing is not implemented yet. Please try again later.');
}

  
}
