import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListingServiceService } from '../../Services/listing-service/listing-service.service';


@Component({
  selector: 'app-listing-parent',
  templateUrl: './listing-parent.component.html',
  styleUrls: ['./listing-parent.component.scss'],
})
export class ListingParentComponent implements OnInit, OnDestroy {
  Value: string = 'Add Property'; // Default page to display
  editItemId: number | null = null; // Stores the ID of the item to edit

  private subscriptions: Subscription[] = []; // Array to track subscriptions

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router,
    private sharedService: ListingServiceService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Get initial Value from localStorage
      this.Value = localStorage.getItem('ActiveElement') ;

      // Listen for changes to 'ActiveElement' in localStorage
      window.addEventListener('storage', this.onStorageChange.bind(this));
    }

    // Subscribe to changes in editItemId from ListingServiceService
    const editItemSubscription = this.sharedService.editItemId$.subscribe((id) => {
      this.editItemId = id;
      if (this.editItemId !== null) {
        // Update Value to show 'Add Property' when editing an item
        this.Value = 'Add Property';
        localStorage.setItem('ActiveElement', 'Add Property'); // Update localStorage for consistency
        // console.log(`Edit Item ID received: ${this.editItemId}`);
        this.cdr.detectChanges(); // Trigger change detection
      }
    });

    this.subscriptions.push(editItemSubscription); // Track the subscription
  }

  // Handle localStorage changes
  onStorageChange(event: StorageEvent): void {
    if (event.key === 'ActiveElement') {
      this.Value = event.newValue || 'Add Property'; // Update dynamically
      this.cdr.detectChanges(); // Trigger UI update
    }
  }

  // Handle Value changes from child components
  receiveValue(value: string): void {
    this.Value = value; // Update Value based on the event
 

    if (value === 'Log Out') {
      // Handle logout logic
      localStorage.removeItem('id');
      this.router.navigate(['/']);
      setTimeout(() => {
        window.location.reload();
      }, 0);
    }

    localStorage.setItem('ActiveElement', value); // Persist new Value in localStorage
    this.cdr.detectChanges(); // Trigger UI update
  }

  ngOnDestroy(): void {
    // Cleanup: Remove event listener and unsubscribe
    window.removeEventListener('storage', this.onStorageChange.bind(this));
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
