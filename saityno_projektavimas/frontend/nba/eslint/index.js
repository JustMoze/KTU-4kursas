module.exports = {
    rules: {
        'no-template-literals': {
            create: function (context) {
                return {
                    TemplateLiteral(node) {
                        context.report(node, 'Do not use template literals');
                    }
                };
            }
        }
    }
};

module.exports.rules = {
    'no-hardcoded-strings': (context) => ({
        CallExpression: (node) => {
            if (node.arguments.some((arg) => arg.type === 'Literal' && arg.value)) {
                context.report(node, 'Do not use hardcoded strings');
            }
        }
    })
};
