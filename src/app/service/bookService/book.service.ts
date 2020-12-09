import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpServiceService } from "../httpService/http-service.service";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpService: HttpServiceService) { }
  baseUrl = environment.baseUrl;


  addBooks(data) {
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }) }
    return this.httpService.post(`${this.baseUrl}Books/Add`, data, true,options)
  }

  getBooks(){
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }) }
    return this.httpService.get(`${this.baseUrl}Books/Display`,true,options)
  }

  updateBooks(data){
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }) }
    return this.httpService.put(`${this.baseUrl}Books/${data.id}`,data,true,options)
  }

  deleteBooks(data){
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }) }
    return this.httpService.delete(`${this.baseUrl}Books/${data}`,true,options)
  }
}
