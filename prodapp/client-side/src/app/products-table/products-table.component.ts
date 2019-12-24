import { Component, OnInit } from '@angular/core';
import { ProdDataService } from '../prod-data.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {

  productsArray:any = [];  
  constructor(private productService: ProdDataService) { }

  ngOnInit() {     
     this.productService.products_to_watch.subscribe( (product_msg) => { this.productsArray = product_msg } );        
     this.productService.fetchAllProducts();
  }
  
  delProduct(rec_id) {  
    this.productService.delProductData(rec_id);     
  }
}
