import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LoadingServiceService } from '../LoadingServ/loading-service.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {


  constructor(private injector: Injector) {}

  handleError(error: any): void {
    console.error('An error occurred:', error);

    const loadingService = this.injector.get(LoadingServiceService);

    // Trigger safe reload logic

    if (this.isCriticalError(error)) {
      
      setTimeout(() => {
        if (loadingService.loadingSubject.getValue()) {
          console.log('there is Problem but page is loaded:', loadingService.loading$.subscribe(), ':', loadingService.loadingSubject.value);
           
        
        }else{
          console.log('No loading in progress, not reloading.');
          alert(`An error occurred. The page will be reloaded. ${error.message} `);
          location.reload();
        }
      }, 10000);
    }
    
      
  }
  private isCriticalError(error: any): boolean {
    return error instanceof TypeError || 
           error?.message?.includes('Cannot read properties') ||
           error?.message?.includes('Unexpected token') ||
           error?.message?.includes('null');
  }
}