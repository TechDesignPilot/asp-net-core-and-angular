import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../../services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../../../models/company.model';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.css'
})
export class CompanyEditComponent {
  form!: FormGroup;
  companyId!: number;
  company!: Company;

  constructor(private companyService: CompanyService, private route: ActivatedRoute, private router: Router) {
    this.initData();
  }

  initData(): void {
    this.companyId = this.route.snapshot.params["id"];
    if (!this.companyId)
      return;

    this.companyService.getById(this.companyId).subscribe(
      data => {
        this.company = data;
        // init form
        this.initForm();
      },
      error => {
        console.error("Error occurred:", error);
      }
    )
  }

  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.company.name, Validators.required),
      address: new FormGroup({
        streetNumber: new FormControl(this.company.address.streetNumber, Validators.required),
        streetName: new FormControl(this.company.address.streetName, Validators.required),
        addressLine2: new FormControl(this.company.address.addressLine2),
        state: new FormControl(this.company.address.state),
        city: new FormControl(this.company.address.city, Validators.required),
        country: new FormControl(this.company.address.country, Validators.required),
      }),
      contacts: new FormArray([

      ])
    });

    // iterate over the contacts, and create new sub-form for each one
    this.company.contacts.forEach(item => {
      const contactForm = this.createContactForm();
      // patch the contact form info using the contact item
      contactForm.patchValue(item);
      // add the contact form to the form
      (this.form.get('contacts') as FormArray).push(contactForm);
    })
  }

  createContactForm(): FormGroup {
    return new FormGroup({
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
    })
  }


  getContactFormArray(): FormArray {
    return this.form.get('contacts') as FormArray;
  }


  onSubmit(): void {
    if (this.form.valid) {
      // put the company information
      this.companyService.put(this.companyId, this.form.value).subscribe(
        data => {
          this.router.navigate(['/companies']);
        },
        error => {
          console.error('Error:', error);
        }
      )
    }
  }
}
