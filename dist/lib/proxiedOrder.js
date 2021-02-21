const OrderModule = require("./order");

const ProxiedOrderModule = new Proxy(OrderModule, {
  construct(target, args) {
    const ignoreModuleNames = ["Foo", "Bar"];
    const waitUntilEnableHeuristic = 10000;
    const className = target.name;
    let heuristicEnable = false;

    if (!ignoreModuleNames.includes(className)) {
      setTimeout(() => {
        // インスタンス化した後10秒後にsetが走っている場合、初期化時では無くリクエスト単位でmutationされている可能性がある
        console.log(`Trap started on ${className}`);
        heuristicEnable = true;
      }, waitUntilEnableHeuristic);
    }

    return new Proxy(new target(...args), {
      set(obj, prop, value) {
        if (heuristicEnable) {
          console.log(`${className}#${prop} = ${value}`);
        }

        return Reflect.set(...arguments);
      }

    });
  }

});
module.exports = ProxiedOrderModule;