import { Routes } from '@angular/router';
import { LibraryBooksComponent } from './library-books/library-books.component';
import { LibraryAboutComponent } from './library-about/library-about.component';

export const routes: Routes = [
    {path: '', redirectTo: 'books', pathMatch: 'full' },
    {path: 'books', component: LibraryBooksComponent },
    {path: 'about', component: LibraryAboutComponent }
];
