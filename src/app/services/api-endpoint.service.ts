import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointService {

  readonly classificationEndpoint = 'https://disaster-classification-server.herokuapp.com/classify_image';

  constructor() { }
}
