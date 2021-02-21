module.exports = function ({ types: t }) {
    return {
        name: "my-babel-plugin",
        visitor: {
            ExpressionStatement(path) {
                if(path.node.expression.type === "AssignmentExpression") {
                    if (path.node.expression.left.object.name === "module" && path.node.expression.left.property.name === "exports") {
                        path.node.expression.right = t.identifier("TEST");
                    }
                }
                return;
            }
        }
    };
};
