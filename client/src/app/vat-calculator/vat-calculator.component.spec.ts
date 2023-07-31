import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VatCalculatorComponent } from './vat-calculator.component';
import { AppModule } from '../app.module';

describe('VatCalculatorComponent', () => {
  let component: VatCalculatorComponent;
  let fixture: ComponentFixture<VatCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VatCalculatorComponent],
      imports: [AppModule],
      teardown: {destroyAfterEach: false}
    });
    fixture = TestBed.createComponent(VatCalculatorComponent);
    component = fixture.componentInstance;    

    const vatRates = [
      { country: "Austria", rates: [5, 10, 13, 20] },
      { country: "United Kingdom", rates: [5, 20] },
      { country: "Portugal", rates: [6, 13, 23] },
      { country: "Singapore", rates: [7] }
    ];
    component.vatRates = vatRates;
    component.selectedCountry = "Austria";
    component.selectedVatRate = 20;
    component.selectedVatRates = vatRates.find(v => v.country == component.selectedCountry)?.rates;    
    component.createForm();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create from', () => {
    expect(component.calculatorForm).toBeDefined();
  });
  
  it('should be invalid when amount is not decimal and provide error messages', () => {
    const control = component.calculatorForm.controls['netAmount'];
    control.setValue("2f12df54");
    control.markAsDirty();
    control.setErrors({'pattern': true});
    control.updateValueAndValidity();

    component.validateInput(component.AmountType.netAmount);

    expect(control.valid).toEqual(false);
    expect(component.formErrors.netAmount).toEqual("amount should be a decimal value (0.00) ");
  });

  it('should be invalid when amount is null and provide error messages', () => {
    const control = component.calculatorForm.controls['grossAmount'];
    control.setValue("");
    control.markAsDirty();
    control.setErrors({'required': true});
    control.updateValueAndValidity();

    component.validateInput(component.AmountType.grossAmount);

    expect(control.valid).toEqual(false);
    expect(component.formErrors.grossAmount).toEqual("required field ");
  });

  it('should update control values on country change', () => {
    component.calculatorForm.controls['netAmount'].setValue(200);
    component.calculatorForm.controls['vat'].setValue(40);
    component.calculatorForm.controls['grossAmount'].setValue(240);
    component.onCountryChange(component.selectedCountry);
    
    expect(component.selectedVatRates).toEqual([5, 10, 13, 20]);
    expect(component.calculatorForm.controls['netAmount'].value).toEqual("");
    expect(component.calculatorForm.controls['vat'].value).toEqual("");
    expect(component.calculatorForm.controls['grossAmount'].value).toEqual("");
  });

  it('should calculate amount on vat rate change', () => {
    component.selectedType = component.AmountType.netAmount;
    component.calculatorForm.controls['netAmount'].setValue('100');
    component.selectedVatRate = 5;

    component.onVatRateChange(component.selectedVatRate);

    expect(component.calculatorForm.controls['vat'].value).toEqual(5);
    expect(component.calculatorForm.controls['grossAmount'].value).toEqual(105);
  });

  it('should calculate amount on net amount change', () => {
    component.selectedType = component.AmountType.netAmount;
    component.calculatorForm.controls['netAmount'].setValue('100');

    component.calculateAmount(component.selectedType, component.selectedVatRate);
    
    expect(component.calculatorForm.controls['vat'].value).toEqual(20);
    expect(component.calculatorForm.controls['grossAmount'].value).toEqual(120);
  });

  it('should calculate amount on vat change', () => {
    component.selectedType = component.AmountType.vat;
    component.calculatorForm.controls['vat'].setValue('20');

    component.calculateAmount(component.selectedType, component.selectedVatRate);
    
    expect(component.calculatorForm.controls['netAmount'].value).toEqual(100);
    expect(component.calculatorForm.controls['grossAmount'].value).toEqual(120);
  });

  it('should calculate amount on gross amount change', () => {
    component.selectedType = component.AmountType.grossAmount;
    component.calculatorForm.controls['grossAmount'].setValue('120');

    component.calculateAmount(component.selectedType, component.selectedVatRate);
    
    expect(component.calculatorForm.controls['netAmount'].value).toEqual(96);
    expect(component.calculatorForm.controls['vat'].value).toEqual(24);
  });

});
