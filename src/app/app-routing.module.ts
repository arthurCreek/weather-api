import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiveDayComponent } from './components/five-day/five-day.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'five-day', component: FiveDayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
