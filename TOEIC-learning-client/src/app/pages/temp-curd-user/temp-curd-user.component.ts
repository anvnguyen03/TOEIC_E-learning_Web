
import { Component, OnInit } from '@angular/core';


import { Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { User } from '../../model/user';
import { UserService } from '../../services/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-temp-curd-user',
  templateUrl: './temp-curd-user.component.html',
  styleUrl: './temp-curd-user.component.css',
  standalone: true,
  imports: [TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, DropdownModule, CommonModule],
  providers: [UserService]
})
export class TempCurdUserComponent implements OnInit {
  users: User[];
  loading: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit() {
    let usersData: Observable<User[]> | null = this.userService.getEmployeeUsers();
    if (usersData == null) {
      return;
    }
    usersData.subscribe({
        next: (users: User[]) => {
          this.users = users;
          this.loading = false;
        },
        error: (error: any) => {
          console.error('fail to load all user', error);
        }
      });
  }

  clear(table: Table) {
    table.clear();
  }

  getSeverity(status: string) {
    // Your logic for determining severity based on status
    // Example:
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'danger';
      default:
        return null;
    }
  }
}
