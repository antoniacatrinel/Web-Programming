import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowDestinationsComponent } from './show-destinations/show-destinations.component';
import { AddDestinationComponent } from './add-destination/add-destination.component';
import { DeleteDestinationComponent } from './delete-destination/delete-destination.component';
import { EditDestinationComponent } from './edit-destination/edit-destination.component';
import { BrowseByCountryComponent } from './browse-by-country/browse-by-country.component';

const routes: Routes = [
  {path: '', redirectTo: '/showAll', pathMatch: 'full'},
  {path: 'showAll', component: ShowDestinationsComponent},
  {path: 'add', component: AddDestinationComponent},
  {path: 'delete', component: DeleteDestinationComponent},
  {path: 'edit', component: EditDestinationComponent},
  {path: 'browseByCountry', component: BrowseByCountryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
