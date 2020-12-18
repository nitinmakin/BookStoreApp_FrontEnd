import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpServiceService } from "../httpService/http-service.service";
//import { Book } from '../../Model/book';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpService: HttpServiceService) { }
  baseUrl = environment.baseUrl;
  private searchBookData = new Subject<any>();

  addBooks(data) {
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }) }
    return this.httpService.post(`${this.baseUrl}Books/Add`, data, true,options)
  }

  addBookToCart(data) {
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }) }
    return this.httpService.post(`${this.baseUrl}Cart/${data}`, data, true,options)
  }

  addBookToWishList(data) {
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }) }
    return this.httpService.post(`${this.baseUrl}WishList/${data.id}`, data, true,options)
  }

  getBooks(){
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }) }
    return this.httpService.get(`${this.baseUrl}Books/Display`,true,options)
  }

getCartBooks(){
  let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }) }
  return this.httpService.get(`${this.baseUrl}Cart/Display`,true,options)
}

getWishListBooks(){
  let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }) }
  return this.httpService.get(`${this.baseUrl}WishList/Display`,true,options)
}

  updateBooks(data){
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }) }
    return this.httpService.put(`${this.baseUrl}Books/${data.id}`,data,true,options)
  }

  deleteBooks(data){
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }) }
    return this.httpService.delete(`${this.baseUrl}Books/${data}`,true,options)
  }

  removeBookFromCart(data){
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }) }
    return this.httpService.delete(`${this.baseUrl}Cart/Remove/${data.bookId}`,true,options)
  }

  placedOrder(){
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }) }
    return this.httpService.get(`${this.baseUrl}Cart/PlaceOrder`,true,options)
  }

  increaseQuantity(data){
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }) }
    return this.httpService.get(`${this.baseUrl}Cart/IncreaseQuantity/${data.bookId}`,true,options)
  }

  decreaseQuantity(data){
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }) }
    return this.httpService.get(`${this.baseUrl}Cart/DecreaseQuantity/${data.bookId}`,true,options)
  }

  priceHighToLow(){
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }) }
    return this.httpService.get(`${this.baseUrl}Books/PriceHighToLow`,true,options)
  }

  priceLowToHigh(){
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }) }
    return this.httpService.get(`${this.baseUrl}Books/PriceLowToHigh`,true,options)
  }

  removeBookFromWishList(data){
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }) }
    return this.httpService.delete(`${this.baseUrl}WishList/RemoveBookFromWishList/${data.bookId}`,true,options)
  }


  addBookFromWishlistToCart(data) {
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token') }) }
    return this.httpService.post(`${this.baseUrl}WishList/AddToCartFromWishlist/${data}`, data, true,options)
  }


  setSearchBookData(message: any) {
    console.log("set service", message);
    return this.searchBookData.next({ books: message });
  }
  getSearchBookData(): Observable<any> {
    console.log("get service");
    return this.searchBookData.asObservable();
  }

}
