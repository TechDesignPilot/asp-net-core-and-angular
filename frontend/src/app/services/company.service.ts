import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  apiUrl = 'https://localhost:7074/api/Companies/'
  constructor(private http: HttpClient) { }

  get(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl);
  }

  getById(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}${id}`);
  }

  post(company: Company): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, company);
  }

  put(companyId: number, company: Company): Observable<Company> {
    return this.http.put<Company>(this.apiUrl + companyId, company);
  }

  delete(id: number): Observable<Company> {
    return this.http.delete<Company>(`${this.apiUrl}${id}`);
  }
}
