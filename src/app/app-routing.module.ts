import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemComponent } from './item/item.component';

const routes: Routes = [
  {
    path: '',
    component: ItemComponent,
  },
  { path: 'ajout', component: AddItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
