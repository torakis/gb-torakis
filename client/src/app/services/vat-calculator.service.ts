import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Injectable } from "@angular/core";
import { VatRate } from "../models/vatRate";

@Injectable({
    providedIn: "root"
  })
export class VatCalculatorService {
    apiUrl: string;

    constructor(private http: HttpClient) {
      this.apiUrl = environment.baseUrl + environment.apiUrl;
    }
  
    getCountries() {
        return this.http.get<string[]>(this.apiUrl + "Calculation/GetCountries");
    }
  
    getVatRates() {
        return this.http.get<VatRate[]>(this.apiUrl + "Calculation/GetVatRates")
    }
}