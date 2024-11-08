import { Component } from '@angular/core';
import { Company } from '../../../models/company.model';
import { CompanyService } from '../../../services/company.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.css'
})
export class CompanyDetailsComponent {

  companyId!: number;
  company!: Company;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initData();
  }

  initData() {
    this.companyId = this.route.snapshot.params["id"];

    // check if the company is valid
    if (!this.companyId)
      return;

    this.companyService.getById(this.companyId).subscribe(
      data => {
        this.company = data;
        console.log('company:', data)
      },
      error => {
        console.error(error);
      }
    )
  }
}
