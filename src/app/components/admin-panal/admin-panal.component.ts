import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from "../../service/bookService/book.service";
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DataService } from "../../service/dataService/data.service";
import { UtilityService } from "../../service/utilityService/utility.service";
import { UpdateBooksComponent } from "../update-books/update-books.component";
import { AddBooksComponent } from "../add-books/add-books.component";

@Component({
  selector: 'app-admin-panal',
  templateUrl: './admin-panal.component.html',
  styleUrls: ['./admin-panal.component.scss']
})
export class AdminPanalComponent implements OnInit {
  reset = true
  book = [];
  dataSource: any;
  index = 1;

  displayedColumns: string[] = ['index', 'image', 'name', 'author', 'price', 'quantity', 'category', 'update', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.displayBooks()

    this.data.currentMessage.subscribe(data => { this.displayBooks() });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private books: BookService, public dialog: MatDialog, private data: DataService,
    private snakeBar: UtilityService) { }
  Admin = "Admin";
  displayBooks() {
    this.books.getBooks().subscribe(result => {
      this.book = result['data'];
      this.book.reverse();
      console.log(this.book)
      this.dataSource = new MatTableDataSource(this.book);
      this.dataSource.paginator = this.paginator;
    },
      (error) => {
        console.log(error)
      })
  }
  
  openUpdateDialog(element) {
    let dialogRef = this.dialog.open(UpdateBooksComponent, { data: element });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddBooksComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteBooks(element) {
    this.books.deleteBooks(element.id).subscribe((result: any) => {
      this.snakeBar.snakeBarMethod("Book deleted Successfully");
      this.displayBooks();
      this.data.changeMessage({});
    },
      (error) => {
        this.snakeBar.snakeBarMethod("OOPS..somethimg went wrong...")
      })
  }
}
