import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './components/notes/notes.component';
import { BorErrorsComponent } from './components/bor-errors/bor-errors.component';
import { PriceHistoryComponent } from './components/price-history/price-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  { path: 'notes', component: NotesComponent },
  { path: 'bor-errors', component: BorErrorsComponent },
  { path: 'price-history', component: PriceHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
