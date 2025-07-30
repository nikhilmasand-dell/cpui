import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './components/notes/notes.component';
import { BorErrorsComponent } from './components/bor-errors/bor-errors.component';
import { PriceHistoryComponent } from './components/price-history/price-history.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    BorErrorsComponent,
    PriceHistoryComponent,
    ContextMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
