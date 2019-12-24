import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProdDataService {

  private products_obs = new BehaviorSubject([]);
  public products_to_watch = this.products_obs.asObservable();
   
  products = [];     
  products_url = "http://localhost:3000/products/"; // GET + POST + PUT + DELETE
 
  constructor(private router: Router) { }
       
  fetchAllProducts(){    
    let list_url = this.products_url;
    fetch(list_url)
        .then((res) => { return res.json(); })
        .then((res) => {                
            this.products = res.data;
            if (this.products.length > 0)
              this.products_obs.next(res.data); // = products              
            else {
              // navigate to home
              alert("NO Products ! redirect to home");
              this.router.navigateByUrl('/home');
            }  
        })
        .catch(err => {
            console.log("fetchAllProducts - fetch Error occured !");
            console.log(err);              
        })
  } 
  
  delProductData(pr_id) {        
    fetch(this.products_url, {
        method: "DELETE",        
        body: JSON.stringify({prod_id: pr_id}),
        headers: {
            "Content-Type": "application/json"
        } 
      })
      .then((res) => { return res.json(); })
      .then((res) => {              
          this.fetchAllProducts();                    
      })
      .catch(err => {
          console.log("delProductData - fetch delete Error occured !");
          console.log(err);              
      })
  }
  
  getProductByID(pid:number) {
    let to_update: any = {};
    for (let idx = 0; idx < this.products.length; idx++) {
      if (pid == this.products[idx].prod_id) {
        to_update = this.products[idx];
        return to_update;
      }
    }
    return null;
  }

  addProductData(new_product) {                    
    fetch(this.products_url, {
      method: "POST",  
      body: JSON.stringify({
              prod_id: 0, // Auto INC by DB !
              name: new_product.product_name,      
              price: new_product.price, 
              weight: new_product.weight,
              color: new_product.color,
              catalog_num: new_product.cat_num}),
      headers: {
          "Content-Type": "application/json"
      } 
    })
    .then((res) => { return res.json(); })
    .then((res) => {                    
        this.fetchAllProducts();                
    })
    .catch(err => {
        console.log("addProductData - fetch add Error occured !");
        console.log(err);              
    })
  }           

  updateProductData(product_data) {        
    fetch(this.products_url, {
      method: "PUT",  
      body: JSON.stringify({
              prod_id: product_data.prod_id,
              name: product_data.product_name,      
              price: product_data.price, 
              weight: product_data.weight,
              color: product_data.color,
              catalog_num: product_data.cat_num }),
      headers: {
          "Content-Type": "application/json"
      } 
    })
    .then((res) => { return res.json(); })
    .then((res) => {                    
        this.fetchAllProducts();               
    })
    .catch(err => {
        console.log("updateProductData - fetch update Error occured !");
        console.log(err);              
    })
  }
}
