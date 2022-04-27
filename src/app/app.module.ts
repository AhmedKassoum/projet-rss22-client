import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemComponent } from './item/item.component';
import { AddItemComponent } from './add-item/add-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsItemComponent } from './details-item/details-item.component';

@NgModule({
  declarations: [AppComponent, ItemComponent, AddItemComponent, DetailsItemComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule,ReactiveFormsModule,FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
