import { Component, ViewChild } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../models/company.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css'
})
export class CompanyListComponent {

  displayedColumns: string[] = ['name', 'address', 'actions'];
  dataSource: MatTableDataSource<Company> = new MatTableDataSource<Company>();

  @ViewChild('deleteDialog') deleteDialog: any;

  public companies!: Company[];
  constructor(private companyService: CompanyService, private matDialog: MatDialog) {
    this.initData();
  }

  initData() {
    this.companyService.get().subscribe(
      data => {
        this.companies = data;
        this.dataSource.data = data;
      })
  }

  onDeleteClick(company: Company) {
    // confirm the deletion, and delete if confirmed
    this.matDialog.open(this.deleteDialog).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.companyService.delete(company.id).subscribe(
          data => {
            this.initData();
          },
          error => {
            console.error(error);
            alert('An error occurred, please try again');

          })
      }
    });
  }
}
