import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VatCalculatorComponent } from './vat-calculator/vat-calculator.component';

const routes: Routes = [
  { path: '', redirectTo: '/vat-calculator', pathMatch: 'full' },
  { path: 'vat-calculator', component: VatCalculatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
