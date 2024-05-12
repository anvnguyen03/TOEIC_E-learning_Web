import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { TestService } from '../../../services/test/test.service';
import { AdminTestService } from '../../../services/admin/admin-test.service';
import { DialogAddTestComponent } from '../admin-layout/dialog-add-test/dialog-add-test.component';

@Component({
  selector: 'app-manage-test',
  standalone: true,
  imports: [RouterLink, DataTablesModule, CommonModule,
    MatButtonModule, MatDialogModule],
  templateUrl: './manage-test.component.html',
  styleUrl: './manage-test.component.css'
})
export class ManageTestComponent {
  dtOptions: Config = {}
  tests: any[] = []

  constructor(private testService: TestService,
    private adminTestService: AdminTestService,
    private dialog: MatDialog,
    private router: Router
  ) {
    
  }
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
    }
    this.getAllTests()
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddTestComponent)

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getAllTests() {
    this.testService.getAllNoPaging().subscribe({
      next: (resp) => {
        this.tests = resp
      }
    })
  }

  changeStatus(id: any) {
    this.adminTestService.changeStatus(id).subscribe({
      next: (resp) => {
        this.tests.forEach((test) => {
          if (test.id == id) {
            test.status = resp.status
          }
        })
      }
    })
  }

  manageQuestion(testId: any) {
    this.router.navigate(['/admindashboard/tests/' + testId + '/questions'])
  }

}
