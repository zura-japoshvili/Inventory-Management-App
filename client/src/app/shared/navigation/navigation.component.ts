import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  items = [
    {
      label: 'Dashboard',
      icon: 'pi pi-fw pi-th-large',
      url: '/dashboard'
    },
    {
      label: 'Add Product',
      icon: 'pi pi-fw pi-image',
      url: '/newProduct'
    },
    {
      label: 'Account',
      icon: 'pi pi-fw pi-chart-bar',
      items: [
        {label: 'Profile', icon: 'pi pi-fw pi-user', url: '/profile'},
        {label: 'Edit Profile', icon: 'pi pi-fw pi-user-edit', url: '/profile/editProfile'}
      ]
    }
  ]
}
