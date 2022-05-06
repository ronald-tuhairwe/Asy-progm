/*eslint-disable*/
"use strict";

/**************modeule partners************************/

/*****************Question 1*********************/
console.log("*****************Question 1********************* ");


const shoppingCart =(function(){

  let basket=[];
  return {
  
    upsertItem(item){
      let index= basket.findIndex(itm => itm.id ===item.id);
      if(index != -1){basket[index] = item; }else
      basket.push(item);
    },
  
  getItemsCount(){ return basket.length;},
  
  getTotalPrice() {
    let total = basket.reduce((a,b) => (a+ b.product.price * b.count),0);
    return total;
  },
  
  removeItemById(id){
  
    let index = basket.findIndex( item => item.id === id);
    basket.splice(index,1);
  
  }
  }
  
  })();

const item1 = {
  id: 0,
  product: {
    id: 1,
    name: "Coffee",
    description: "Coffee Grounds from Ethiopia",
    price: 9,
  },
  count: 1,
};
const item2 = {
  id: 1,
  product: {
    id: 2,
    name: "Tea",
    description: "Oonlong Tea from China",
    price: 10,
  },
  count: 5,
};
const item3 = {
  id: 2,
  product: {
    id: 3,
    name: "Bottled Water",
    description: "Bottled Water from US",
    price: 2,
  },
  count: 30,
};

shoppingCart.upsertItem(item1);
shoppingCart.upsertItem(item2);
shoppingCart.upsertItem(item3);
console.log(shoppingCart.getTotalPrice()); //Expected Result: 119
item3.product.name = "Himilayan Water";
item3.product.price = 10;
shoppingCart.upsertItem(item3);

console.log(shoppingCart.getItemsCount()); //Expected Result: 3
console.log(shoppingCart.getTotalPrice()); //Expected Result: 359
shoppingCart.removeItemById(1);
console.log(shoppingCart.getItemsCount()); //Expected Result: 2
console.log(shoppingCart.getTotalPrice()); //Expected Result: 309

console.log("*****************Question 2********************* ");

/*****************Question 2*********************/

function Subject() {
 
  const obsever = {};
  return {
    on: function (event, func) {
      if (obsever[event]) {
        obsever[event].push(func);
      } else obsever[event] = [func];
    },

    emit: function (event, msg) {
      if (obsever[event]) {
        for (let elm of obsever[event]) {
          elm(msg);
        }
      }
    },
  };
}

const subject = new Subject();
subject.on('eat', console.log); // register an observer
subject.on('study', console.log); // register an observer

function foo(msg) {
    console.log('foo: ' + msg);
}
subject.on('eat', foo);
subject.on('study', foo);

subject.emit('eat', 'Corn');
//output for Line above: subject.emit('eat', 'Corn');
// Corn
// foo: Corn
subject.emit('study', 'cs445');
//output for Line above: subject.emit('study', 'cs445');
// cs445
// foo: cs445


console.log("*****************Practice********************* ");

/*****************Question 2*********************/

function Info(){ 
 return{logging(msg){console.info(msg)}}
  }
  function Warn(){ 
    return{logging(msg){console.warn(msg)}}
     }
     class Error{ 
       name;
     logging(msg){console.error(msg)}
       }
       function Table(arr){ 
        return{logging(arr){console.table(arr)}}
         }



class Strategy{
//let strat;

 
  setStrategy(strg){
    this.strat=strg;
  
 };

logging(msg){
  return this.strat.logging(msg);
}

}

const strategy = new Strategy();

strategy.setStrategy(new Info());
strategy.logging('info....');

strategy.setStrategy(new Warn());
strategy.logging('warn....');

strategy.setStrategy(new Error());
strategy.logging('error....');

strategy.setStrategy(new Table());
strategy.logging(['table', 'table']);






