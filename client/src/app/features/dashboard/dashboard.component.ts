import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserAuthService} from "../../core/services/user-auth.service";
import {catchError, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {FullUserData} from "../../core/interfaces/fullUserData";
import {ProductService} from "../../core/services/product.service";
import {SortEvent} from "primeng/api";
import {ProductInt} from "../../core/interfaces/productInt";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  constructor(private _userAuth: UserAuthService,
              private _product: ProductService,
              private _router: Router,
              private _change: ChangeDetectorRef) { }

  user: FullUserData = JSON.parse(localStorage.getItem('User')!);
  public allProduct!: ProductInt[];

  ngOnInit(): void {
    console.log(this.user)
    this._userAuth.checkStatus().pipe(
      tap((value) => {
        if (!value){
          this._router.navigateByUrl('/auth/login').then();
        }
      }),
      catchError(err => {
        // To error page or login p
        // this._router.navigateByUrl('/auth/login').then();
        return of ([])
      })
    ).subscribe()

    this._product.getAllProduct(this.user._id).pipe(tap((value) => {
        if (value.length === 0) {
          console.log("Empty")
        }
      }),catchError((err) => {
        return of ([]);
      })
    ).subscribe((value) => {
      console.log(value)
      this.allProduct = value;
      this._change.markForCheck();
    })
  }


  customSort(event: SortEvent) {
    event.data!.sort((data1, data2) => {
      let value1 = data1[event.field!];
      let value2 = data2[event.field!];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order! * result);
    });
  }

  public pr(id: string){
    console.log(id);
  }
}
