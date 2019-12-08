import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProdDataService {

   // Observeble Service Message:
   private msgProductSource = new BehaviorSubject('DEFAULT'); // default message
   currProductMsg = this.msgProductSource.asObservable();
 
   changeProductMessage(product_msg: string) {
     this.msgProductSource.next(product_msg)
   }
 
   newMsgForProducts(msg) {    
     this.changeProductMessage(msg);    
   }
 
   products = [];   
   insert_products_url = "http://localhost:3000/products/insert"; // POST
   delete_products_url = "http://localhost:3000/products/delete"; // DELETE
   update_products_url = "http://localhost:3000/products/update"; // PUT   
   list_products_url = "http://localhost:3000/products/list"; // GET
 
   constructor(private router: Router) { }

   
  getAllProducts(){    
    return this.products;
  }
    
  fetchAllProducts(){
    // console.log("fetchAllProducts - started !")
    let list_url = this.list_products_url;
    fetch(list_url)
        .then((res) => { return res.json(); })
        .then((res) => {                
            this.products = res.data;
            // console.log("fetchAllProducts - fetch retrived all products:");
            // console.log(this.products);            
            if (this.products.length > 0)
              this.newMsgForProducts("PRODUCTS-TABLE UPDATED"); // table is updated
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
    fetch(this.delete_products_url, {
        method: "DELETE",        
        body: JSON.stringify({prod_id: pr_id}),
        headers: {
            "Content-Type": "application/json"
        } 
      })
      .then((res) => { return res.json(); })
      .then((res) => {    
          // let del_msg = res.message;
          // console.log("delProductData - fetch deleted product with Id:" + pr_id);
          // console.log(del_msg);
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
    // console.log("addProductData - fetch started !")

    fetch(this.insert_products_url, {
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
        // let add_msg = res.message;
        // console.log("addProductData - fetch added new product");
        // console.log(add_msg);
        
        this.fetchAllProducts();                
    })
    .catch(err => {
        console.log("addProductData - fetch add Error occured !");
        console.log(err);              
    })
  }           


  updateProductData(product_data) {    
    // console.log("updateProductData - fetch started for product " + product_data.product_name + " !");
    fetch(this.update_products_url, {
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
        // let update_msg = res.message;        
        // console.log(update_msg);
        this.fetchAllProducts();               
    })
    .catch(err => {
        console.log("updateProductData - fetch update Error occured !");
        console.log(err);              
    })
  }

}
