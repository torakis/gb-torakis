import { TestBed } from '@angular/core/testing';

import { VatCalculatorService } from './vat-calculator.service';
import { AppModule } from '../app.module';
import { VatRate } from '../models/vatRate';

describe('VatCalculatorService', () => {
  let service: VatCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
    service = TestBed.inject(VatCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should get countries", (done) => {
    var countries = ["Austria", "United Kingdom", "Portugal", "Singapore"];
    service.getCountries().subscribe(res => {
      countries.forEach(country => {
        expect(res).toContain(country);        
      });
      done();
    });
  });

  it("should get vat rates", (done) => {
    var vatRates = Array.from([
      { country: "Austria", rates: [5, 10, 13, 20] },
      { country: "United Kingdom", rates: [5, 20] },
      { country: "Portugal", rates: [6, 13, 23] },
      { country: "Singapore", rates: [7] }
    ]);
    service.getVatRates().subscribe(res => {
      vatRates.forEach(vatRate => {
        expect(res).toContain(vatRate);        
      });
      done();
    });  
  });
});
