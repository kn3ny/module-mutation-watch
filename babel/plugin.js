const template = require("@babel/template").default;

const proxiedSource = template(`
  new Proxy(__SOURCE__, {
    construct(target, args) {
        const ignoreModuleNames = ["Foo", "Bar"];
        const waitUntilEnableHeuristic = 10000;

        const className = target.name;

        let heuristicEnable = false;
        if (!ignoreModuleNames.includes(className)) {
            setTimeout(() => {
                // インスタンス化した後10秒後にsetが走っている場合、初期化時では無くリクエスト単位でmutationされている可能性がある
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
});`);

module.exports = function ({ types: t }) {
    return {
        name: "my-babel-plugin",
        visitor: {
            ExpressionStatement(path) {
                if(path.node.expression.type === "AssignmentExpression") {
                    if (path.node.expression.left.object && path.node.expression.left.object.name === "module" && path.node.expression.left.property.name === "exports") {
                        path.node.expression.right = proxiedSource({
                            __SOURCE__: t.identifier(path.node.expression.right.name),
                        })
                    }
                }
                return;
            }
        }
    };
};
