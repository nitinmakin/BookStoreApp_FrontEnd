import { Pipe, PipeTransform } from '@angular/core';
import { Book } from "../Model/book";

@Pipe({
  name: 'searchBook'
 // pure: false
})
export class SearchBookPipe implements PipeTransform {
 // private counter = 0;
  transform(books: Book[], searchTerm: string) {
      if (!books || !searchTerm) {
        return books;
      }
      return books.filter(book =>
        book.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
  }

