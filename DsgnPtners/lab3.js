/*eslint-disable*/
"use strict";

/*****************Question 1*********************/

class regular {
  constructor() {
    (this.range = "50-100"), (this.duration = "10yrs");
  }
}

class energy {
  constructor(color) {
    (this.color = color), (this.range = "5-40"), (this.duration = "10yrs");
  }
}

class Factory {
  createBulb(type, color) {
    let bulb;

    if (type === "regular") {
      bulb = new regular();
    } else {
      bulb = new energy(color);
    }
    return bulb;
  }
}

const bulbs = [];
const factory = new Factory();

bulbs.push(factory.createBulb("regular"));
bulbs.push(factory.createBulb("energy", "red"));

for (let i = 0, len = bulbs.length; i < len; i++) {
  console.log(bulbs[i]);
}

console.log();
/*****************Question 2*********************/

class User {
  constructor(name) {
    this.name = name;
  }
}

class DecoratedUser {
  constructor(user, street, state) {
    (this.street = street), (this.user = user), (this.state = state);
  }
  logger = function () {
    console.log(this.user.name + "\nfrom " + this.street + "\n" + this.state);
  };
}
const user = new User("Kelly");

const decorated = new DecoratedUser(user, "Broadway", "New York");
decorated.logger();

console.log();
/*****************Question 3*********************/

class Info {
  logging(msg) {
    console.info(msg);
  }
}

class Warn {
  logging(msg) {
    console.warn(msg);
  }
}

class Error {
  logging(msg) {
    console.error(msg);
  }
}

class Table {
  logging(msg) {
    console.table(msg);
  }
}

class Strategy {
  setStrategy(method) {
    this.method = method;
  }

  logging(msg) {
    this.method.logging(msg);
  }
}

const strategy = new Strategy();

strategy.setStrategy(new Info());
strategy.logging("info....");

strategy.setStrategy(new Warn());
strategy.logging("warn....");

strategy.setStrategy(new Error());
strategy.logging("error....");

strategy.setStrategy(new Table());
strategy.logging(["table", "table"]);

console.log();
/*****************Question 4*********************/

function fibonacci1(n) {
  if (n <= 1) {
    return 1;
  }
  return fibonacci1(n - 1) + fibonacci1(n - 2);
}
console.log(fibonacci1(5));

//***********mem***** */

let fibonacci = (function () {
  let memo = {};

  function func(num) {
    let value;

    if (num in memo) {
      value = memo[num];
    } else {
      if (num <= 1 ) {
        value = 1;
      } else {
        value = func(num - 1) + func(num - 2);
      }

      memo[num] = value;
    }

    return value;
  }

  return func;
})();

console.log(fibonacci(5));
