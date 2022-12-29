import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../core/services/product.service";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  constructor(private _product: ProductService) { }

  uploadedFiles!: File;

  productForm = new FormGroup({
    name: new FormControl("", Validators.required),
    category: new FormControl("", Validators.required),
    quantity: new FormControl("", Validators.required),
    price: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required)
  })

  ngOnInit(): void {
  }

  onUpload(event: { files: File[] }) {
    const img: File = event.files![0];
    let formData = new FormData

    this.uploadedFiles = img;
    const {name, category, quantity, price, description} = this.productForm.value;

    formData.set("name", name!);
    formData.set("category", category!);
    formData.set("quantity", quantity!);
    formData.set("price", price!);
    formData.set("description", description!);
    formData.set("image", img)

    this._product.newProduct(formData).subscribe((value) => {
      console.log(value)
    })


  }

}
