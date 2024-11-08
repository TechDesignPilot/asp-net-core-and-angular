import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../../services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrl: './company-create.component.css'
})
export class CompanyCreateComponent {

  form!: FormGroup;

  constructor(
    private companyService: CompanyService,
    private router: Router
  ) {
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormGroup({
        streetNumber: new FormControl('', Validators.required),
        streetName: new FormControl('', Validators.required),
        addressLine2: new FormControl(''),
        state: new FormControl(''),
        city: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
      }),
      contacts: new FormArray([
        this.createContactForm()
      ])
    });
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

  getContactForm(index: number): FormGroup {
    return this.getContactFormArray().controls.at(index) as FormGroup;
  }

  onSubmit() {
    if (this.form.valid) {
      // post the form data to the .net core api
      this.companyService.post(this.form.value).subscribe(
        data => {
          this.router.navigate(['/companies/']);
        },
        error => {
          alert("An error occurred, please try again");
          console.error("ERROR:", error);
        }
      )
    } else {
      // warn the user about the missing fields
      alert("Please fill all required fields");
    }
  }

}
