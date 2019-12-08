import { Component, OnInit } from '@angular/core';
import { ProdDataService } from '../prod-data.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product_name = "";
  product_id = 0;
  price = 0.0;
  weight = 0.0;
  color = "";
  cat_num = "";

  updated_id = "";
  new_product = {};  

  constructor(private productService: ProdDataService,  private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {    
    this.updated_id = this.route.snapshot.paramMap.get('prod_id');         
    if (this.updated_id != null) {
      this.product_id = parseInt(this.updated_id); // also: Number()   
    }        
    // console.log("updated_id: " + this.updated_id + " , product_id: " + this.product_id); // TEST
    if (this.product_id > 0) {
      let to_update = this.productService.getProductByID(this.product_id);
      // console.log(to_update); // TEST
      if (to_update == null) {
        console.log("get product details by its ID - Failed !");
        return;
      }        

      // Fill The Form 
      this.product_name = to_update.name;
      this.product_id = to_update.prod_id; 
      this.price = to_update.price;
      this.weight = to_update.weight;
      this.color = to_update.color;
      this.cat_num = to_update.catalog_num;           
    }           
  }
  
  saveProduct() {           
    if (this.product_name == "" || this.price == 0.0 || this.weight == 0.0 || this.color == "" || this.cat_num == "") {
      console.log("saveProduct - missing values. can't save .. ");
      alert("saveProduct - missing values. can't save .. ");
      return;
    }
    this.new_product = {
      prod_id: 0, // Auto INC by DB !
      product_name: this.product_name,      
      price: this.price,
      weight: this.weight,
      color: this.color,
      cat_num: this.cat_num     
    }    
    // console.log(this.new_product); // TEST
    this.productService.addProductData(this.new_product);
    this.clearForm();
    this.new_product={};    
    this.router.navigateByUrl('/products-table'); // redirect back to products table
  }  
  

  updateProduct() {
    if (this.product_id < 1) {
      console.log("updateProduct - Can't update product id 0");
      alert("updateProduct - Can't update product id 0");
      this.clearForm();
      return;
    }   
    let product_data = {
        prod_id: this.product_id, 
        product_name: this.product_name,      
        price: this.price,
        weight: this.weight,
        color: this.color,
        cat_num: this.cat_num  
    };        
    // console.log(product_data); // TEST
    this.productService.updateProductData(product_data);    
    this.clearForm();   
    this.router.navigateByUrl('/products-table'); // redirect back to products table
  }

  clearForm() {
    this.product_name = "";
    this.price = 0.0;    
    this.weight = 0.0;
    this.color = "";
    this.cat_num = "";        
    this.product_id = 0;
  }
}
