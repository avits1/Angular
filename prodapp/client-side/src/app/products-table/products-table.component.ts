import { Component, OnInit } from '@angular/core';
import { ProdDataService } from '../prod-data.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {

  productsArray:any = [];
  productserv_msg = "";
  constructor(private productService: ProdDataService) { }

  ngOnInit() {
     // this.productService.currProductMsg.subscribe(product_msg => this.productserv_msg = product_msg);
     this.productService.currProductMsg.subscribe((product_msg) => 
     {
       this.productserv_msg = product_msg;
       this.refreshTable();
     });    
     this.productService.fetchAllProducts();
  }
  
  refreshTable() {   
    this.productsArray = this.productService.getAllProducts();    
  }

  delProduct(rec_id) {  
    this.productService.delProductData(rec_id);     
  }
}
