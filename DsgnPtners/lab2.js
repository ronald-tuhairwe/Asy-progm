/*eslint-disable*/
"use strict";

/**************modeule partners************************/

/*****************Question 1*********************/
const shoppingCart = (function () {
  let basket = [];

  return {
    upsertItem: function (item) {
     if(basket.find(itm => itm.id===item.id )){
      //  let cnt= basket.find(itm => itm.id===item.id ).count;
      //  item.count +=cnt;
basket[basket.indexOf(item)]= item;

     }else
     basket.push(item);

    },

    getItemsCount: function () {
      return basket.length;
    },

    getTotalPrice: function () {
      let total = basket.reduce((a, b) => a+b.product.price * b.count,0);
      
      return total;
    },

    removeItemById: function (id) {
      let index= basket.map((item) => item.id).indexOf(id);
      basket.splice(index, 1);
      return ;
    },
  };
})();

const item1 = { id: 0, product: { id: 1, name: 'Coffee', description: 'Coffee Grounds from Ethiopia', price: 9 }, count: 1 }
const item2 = { id: 1, product: { id: 2, name: 'Tea', description: 'Oonlong Tea from China', price: 10 }, count: 5 }
const item3 = { id: 2, product: { id: 3, name: 'Bottled Water', description: 'Bottled Water from US', price: 2 }, count: 30 }

shoppingCart.upsertItem(item1);
shoppingCart.upsertItem(item2);
shoppingCart.upsertItem(item3);
console.log(shoppingCart.getTotalPrice()); //Expected Result: 119
item3.product.name = 'Himilayan Water';
item3.product.price = 10;
shoppingCart.upsertItem(item3);

console.log(shoppingCart.getItemsCount()); //Expected Result: 3
console.log(shoppingCart.getTotalPrice()); //Expected Result: 359
shoppingCart.removeItemById(1);
console.log(shoppingCart.getItemsCount()); //Expected Result: 2
console.log(shoppingCart.getTotalPrice()); //Expected Result: 309

/*****************Question 2*********************/

class Subject {
  constructor() {
    this. observers = [];
  }

  on(event, func) {
      if (this.observers[event]) {
          this.observers[event].push(func);
      } else {
          this.observers[event] = [func];
      }
  }

  emit(event, message) {
      if (this.observers[event]) {
          this.observers[event].forEach(fnc => fnc(message));
      }
  }
}


const subject = new Subject();
subject.on("eat", console.log);
subject.on("study", console.log); 

function foo(msg) {
    console.log("foo:"  + msg);
}
subject.on("eat", foo); 
subject.on("study", foo); 

subject.emit("eat", "Corn");
