import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

@Injectable()
export class GlobalErrorHandler {

  constructor(private readonly injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {

   console.log(error);
  }
}
