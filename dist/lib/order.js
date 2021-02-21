class OrderModule {
  constructor() {
    this.orderId = "";
  }

  setOrderId(value) {
    this.orderId = value;
  }

  getOrderId() {
    return this.orderId;
  }

}

module.exports = new Proxy(OrderModule, {
  construct(target, args) {
    const ignoreModuleNames = ["Foo", "Bar"];
    const waitUntilEnableHeuristic = 10000;
    const className = target.name;
    let heuristicEnable = false;

    if (!ignoreModuleNames.includes(className)) {
      setTimeout(() => {
        console.log("Trap started on " + className);
        heuristicEnable = true;
      }, waitUntilEnableHeuristic);
    }

    return new Proxy(new target(...args), {
      set(obj, prop, value) {
        if (heuristicEnable) {
          console.log("" + className + "#" + prop + " = " + value);
        }

        return Reflect.set(...arguments);
      }

    });
  }

});;