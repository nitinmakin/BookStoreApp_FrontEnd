import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from "../../service/bookService/book.service";
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from "../dialog-box/dialog-box.component";
import { MatPaginator } from '@angular/material/paginator';
import { DataService } from "../../service/dataService/data.service";
import { UtilityService } from "../../service/utilityService/utility.service";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateBooksComponent } from "../update-books/update-books.component";
import { AddBooksComponent } from "../add-books/add-books.component";


//import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-admin-panal',
  templateUrl: './admin-panal.component.html',
  styleUrls: ['./admin-panal.component.scss']
})
export class AdminPanalComponent implements OnInit {
  reset = true
  book = [];
  dataSource: any;


  displayedColumns: string[] = ['id', 'image', 'name', 'author', 'price', 'quantity', 'category', 'update', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.displayBooks()
    this.dataSource.paginator = this.paginator;
    // this.data.currentMessage.subscribe(data => { this.displayBooks() });
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
      return this.book;
    },
      (error) => {
        console.log(error)
      })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
      // this.operation.emit();
      this.data.changeMessage({});
    },
      (error) => {
        this.snakeBar.snakeBarMethod("OOPS..somethimg went wrong...")
      })
  }




}
