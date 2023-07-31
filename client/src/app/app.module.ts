import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { MaterialModule } from './shared/material.module';
import { VatCalculatorComponent } from './vat-calculator/vat-calculator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VatCalculatorService } from './services/vat-calculator.service';
import { HttpClientModule } from '@angular/common/http';
import { TwoDecimalPlacesDirective } from './directives/two-decimal-places.directive';
import { KeyupValidationDirective } from './directives/keyup-validation.directive';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    VatCalculatorComponent,
    TwoDecimalPlacesDirective,
    KeyupValidationDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,    
  ],
  providers: [VatCalculatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
