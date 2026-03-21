import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data';
import { Subscription, Observable } from 'rxjs';
import { BookCardComponent } from '../book-card/book-card';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './books.html',
  styleUrls: ['./books.css']
})
export class BooksComponent implements OnInit, OnDestroy {

  books: any[] = [];
  books$!: Observable<any[]>;

  private sub!: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {

    // 🔴 Manual Subscribe
    this.sub = this.dataService.getBooks().subscribe(data => {
      this.books = data;
    });

    // 🟢 Async Pipe
    this.books$ = this.dataService.getBooks();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}