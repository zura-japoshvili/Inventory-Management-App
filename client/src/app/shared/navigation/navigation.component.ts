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
    },
    {
      label: 'Add Product',
      icon: 'pi pi-fw pi-image',
    },
    {
      label: 'Account',
      icon: 'pi pi-fw pi-chart-bar',
      items: [
        {label: 'Profile', icon: 'pi pi-fw pi-user'},
        {label: 'Edit Profile', icon: 'pi pi-fw pi-user-edit'}
      ]
    }
  ]
}
