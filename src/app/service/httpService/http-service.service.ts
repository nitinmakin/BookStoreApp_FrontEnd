import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private httpClient: HttpClient) { }

  Url = environment.baseUrl;

  post(url, user, isHeaderRequired = false, header = null) {
    return this.httpClient.post(url, user, isHeaderRequired && header)
  }
  get(url, isHeaderRequired = false, header = null) {
    return this.httpClient.get(url, isHeaderRequired && header)
  }

  put(url, user, isHeaderRequired = false, header = null) {
    return this.httpClient.put(url, user, isHeaderRequired && header)
  }

  delete(url, isHeaderRequired = false, header = null) {
    return this.httpClient.delete(url, isHeaderRequired && header)
  }
}
