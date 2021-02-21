class User {
  constructor() {
    this.userId = "";
  }

  setUserId(value) {
    this.userId = value;
  }

  getUserId() {
    return this.userId;
  }

}

module.exports = new Proxy(User, {
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