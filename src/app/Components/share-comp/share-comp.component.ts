import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-share-comp',
  templateUrl: './share-comp.component.html',
  styleUrl: './share-comp.component.scss'
})
export class ShareCompComponent  implements OnInit {
@Input() ElementInfo: any ;
@ViewChild('linkText') linkTextRef: ElementRef;

  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }
copyUrl='../../../assets/Imges/StaticImg/StaticIcons/copy-outline.svg'

ElementLink;

ngOnInit(): void {
  console.log(this.ElementInfo);
  if (this.ElementInfo.gncxdebis_idi) {
  this.ElementLink=`https://findhouse.ge/allCards/${this.ElementInfo.gncxdebis_idi}`;
  }else if (this.ElementInfo.id) {
  this.ElementLink=`https://findhouse.ge/allCards/${this.ElementInfo.id}`;
  }else{

  }
}
constructor(private http:HttpClient){}

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
share(page: 'facebook' | 'messenger' | 'whatsapp'): void {
  const url = encodeURIComponent(this.ElementLink);
  let shareUrl = '';

  if (page === 'facebook') {
    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(shareUrl, '_blank', 'noopener');
  } else if (page === 'messenger') {
    this.http.post('share.php', {
      gaziarebis_gverdi: page,
      gasaziarebeli_linki: this.ElementLink
    }).subscribe({
      next: (resp: any) => {
        shareUrl = resp.share_url;

        window.open(shareUrl, '_blank', 'noopener'); // ✅ Now it's correct
      },
      error: (err) => console.error('Error logging share:', err)
    });
  } else if (page === 'whatsapp') {
    shareUrl = /Mobi|Android|iPhone/i.test(navigator.userAgent)
      ? `https://api.whatsapp.com/send?text=${url}`
      : `https://web.whatsapp.com/send?text=${url}`;
    window.open(shareUrl, '_blank', 'noopener');
  }
}



  
}
