import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VatCalculatorService } from '../services/vat-calculator.service';
import { VatRate } from '../models/vatRate';

enum AmountType {
  netAmount,
  vat,
  grossAmount,
  None
}

@Component({
  selector: 'app-vat-calculator',
  templateUrl: './vat-calculator.component.html',
  styleUrls: ['./vat-calculator.component.scss']
})
export class VatCalculatorComponent implements OnInit {
  calculatorForm: FormGroup;
  formErrors: any = {
    netAmount: '',
    vat: '',
    grossAmount: '',
  };

  AmountType = AmountType;
  countries : string[];
  amounts : string[] = ['netAmount', 'vat', 'grossAmount'];
  selectedCountry : string;
  selectedVatRates? : number[];
  selectedOption : AmountType;
  selectedType : AmountType;
  selectedVatRate : number = 0;
  vatRates : VatRate[];

  validationMessages: any = {
    netAmount: {
      pattern: 'amount should be a decimal value (0.00)',
      required: 'required field'
    },
    vat: {
      pattern: 'amount should be an integer value',
      required: 'required field'
    },
    grossAmount: {
      pattern: 'amount should be a decimal value (0.00)',
      required: 'required field'
    },
  };

  constructor(
    private fb: FormBuilder,
    private vatCalculatorService: VatCalculatorService
  ) {}
  
  ngOnInit() {
    this.createForm();
    this.initializeData();
  }

  createForm() {
    this.calculatorForm = this.fb.group({
      selectedVatRate: [],
      selectedOption: [],
      netAmount: [{value: '', disabled: this.selectedOption != AmountType.netAmount }, [Validators.required, Validators.pattern(/^(?!0)\d*\.?\d*$/)]],
      vat: [{value: '', disabled: this.selectedOption != AmountType.vat }, [Validators.required, Validators.pattern(/^-?[1-9]\d*$/)]],
      grossAmount: [{value: '', disabled: this.selectedOption != AmountType.grossAmount }, [Validators.required, Validators.pattern(/^(?!0)\d*\.?\d*$/)]]
    });
  }

  initializeData() {
    this.vatCalculatorService.getCountries().subscribe({
      next: (res: string[]) => {
        this.countries = res;
        this.selectedCountry = res[0];
        this.vatCalculatorService.getVatRates().subscribe({
          next: (res: VatRate[]) => {
            this.vatRates = res;
            this.selectedVatRates = this.vatRates.find(v => v.country == this.selectedCountry)?.rates;
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onCountryChange(data: string) {
    this.selectedCountry = data;
    this.selectedVatRates = this.vatRates.find(v => v.country == this.selectedCountry)?.rates;
    this.updateControlValues(true);
    console.log(this.calculatorForm.controls['selectedVatRate']);
  }

  onVatRateChange(data: number) {
    this.selectedVatRate = data;
    this.calculateAmount(this.selectedType, this.selectedVatRate);
    console.log(this.calculatorForm.controls['selectedVatRate']);
  }

  onSelectionChange(data?: any) {
    this.selectedOption = data.value;
    this.updateControlValues();
  }

  onAmountChange(type: AmountType) {
    const form = this.calculatorForm;
    this.selectedType = type;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        if (AmountType[this.selectedType] == field) {
          const control = form.get(field);
          if (control && control.valid && this.selectedVatRate != 0) {
            this.calculateAmount(this.selectedType, this.selectedVatRate);
          }
        }
      }
    }
  }

  validateInput(type: AmountType) {
    //clear previous errors
    this.formErrors[AmountType[type]] = '';

    const form = this.calculatorForm;
    const control = form.get(AmountType[type]);
    control?.markAsTouched();

    if (control && control.dirty && !control.valid) {
      const messages = this.validationMessages[AmountType[type]];
      console.log('t1');
      console.log(control.errors);
      for (const key in control.errors) {
        console.log('t2');
        if (control.errors.hasOwnProperty(key)) {
          console.log('t3');
          this.formErrors[AmountType[type]] += messages[key] + ' ';
        }
      }
    }
    control?.updateValueAndValidity();
  }

  calculateAmount(type: AmountType, vatRate: number) {
    const form = this.calculatorForm;

    const netAmountControl = form.controls['netAmount'];
    const vatControl = form.controls['vat'];
    const grossAmountControl = form.controls['grossAmount'];

    const netAmountValue = netAmountControl.value;
    const vatValue = vatControl.value;
    const grossAmountValue = grossAmountControl.value;

    switch(type) {
      case AmountType.netAmount:
        var vatVal = netAmountValue * (vatRate / 100);
        vatVal = parseFloat(vatVal.toFixed(2));
        
        var grossVal = Number(netAmountValue) + Number(vatVal);
        grossVal = parseFloat(grossVal.toFixed(2));

        vatControl.setValue(vatVal); 
        grossAmountControl.setValue(grossVal);
        break;
      case AmountType.vat:
        var netVal = vatValue / (vatRate / 100);
        netVal = parseFloat(netVal.toFixed(2));
        
        var grossVal = Number(netVal) + Number(vatValue);
        grossVal = parseFloat(grossVal.toFixed(2));
        
        netAmountControl.setValue(netVal);
        grossAmountControl.setValue(grossVal); 
        
        break;
      case AmountType.grossAmount:
        var vatVal = grossAmountValue * (vatRate / 100);
        vatVal = parseFloat(vatVal.toFixed(2));

        var netVal = grossAmountValue - vatVal;
        netVal = parseFloat(netVal.toFixed(2));
        
        netAmountControl.setValue(netVal);
        vatControl.setValue(vatVal); 
        break;
    }
  }

  private updateControlValues(reset?: boolean) {
    const form = this.calculatorForm;
    const netAmountControl = form.controls['netAmount'];
    const vatControl = form.controls['vat'];
    const grossAmountControl = form.controls['grossAmount'];

    if (reset) {
      this.selectedOption = AmountType.None;
      this.selectedVatRate = 0;
      form.controls['selectedVatRate'].setValue('');
      form.controls['selectedOption'].setValue('');
    }

    switch (this.selectedOption) {
      case AmountType.netAmount:
        this.formErrors['netAmount'] = '';
        netAmountControl.setValue('');
        netAmountControl.enable();
        vatControl.setValue('');
        vatControl.disable();
        vatControl.markAsUntouched();
        grossAmountControl.setValue('');
        grossAmountControl.disable();
        grossAmountControl.markAsUntouched();
        break;
      case AmountType.vat:
        this.formErrors['vat'] = '';
        vatControl.setValue('');
        vatControl.enable();
        netAmountControl.setValue('');
        netAmountControl.disable();
        netAmountControl.markAsUntouched();
        grossAmountControl.setValue('');
        grossAmountControl.disable();
        grossAmountControl.markAsUntouched();
        break;
      case AmountType.grossAmount:
        this.formErrors['grossAmount'] = '';
        grossAmountControl.setValue('');
        grossAmountControl.enable();
        netAmountControl.setValue('');
        netAmountControl.disable();
        grossAmountControl.markAsUntouched();
        vatControl.setValue('');
        vatControl.disable();
        vatControl.markAsUntouched();
        break;
        case AmountType.None:
          this.formErrors['netAmount'] = '';
          this.formErrors['vat'] = '';
          this.formErrors['grossAmount'] = '';
          netAmountControl.setValue('');
          netAmountControl.disable();
          vatControl.setValue('');
          vatControl.disable();
          grossAmountControl.setValue('');
          grossAmountControl.disable();
          break;
      default:
        break;
    }
  }
}
