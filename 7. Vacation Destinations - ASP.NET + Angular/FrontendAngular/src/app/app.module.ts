import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowDestinationsComponent } from './show-destinations/show-destinations.component';
import { AddDestinationComponent } from './add-destination/add-destination.component';
import { DeleteDestinationComponent } from './delete-destination/delete-destination.component';
import { EditDestinationComponent } from './edit-destination/edit-destination.component';
import { BrowseByCountryComponent } from './browse-by-country/browse-by-country.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowDestinationsComponent,
    AddDestinationComponent,
    DeleteDestinationComponent,
    EditDestinationComponent,
    BrowseByCountryComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
