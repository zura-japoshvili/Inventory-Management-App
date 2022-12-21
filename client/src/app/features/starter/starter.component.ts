import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
