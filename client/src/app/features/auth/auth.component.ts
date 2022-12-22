import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  value4: any;

  constructor() { }

  ngOnInit(): void {
  }

}
