module.exports = {
    "env": {
        "browser": true,
        "es2022": true,
        "node": true,
    },
    "extends": [
        "plugin:prettier/recommended",
        "prettier",
        "eslint:recommended",
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 'latest',
        "sourceType": "module",
        "project": "./tsconfig.json",
    },
    "plugins": ["prettier", "@typescript-eslint"],
    "rules": {
        "class-methods-use-this": ["off"],
        "no-restricted-syntax": ["off", "FunctionExpression", "WithStatement", "BinaryExpression[operator='of']"],
        'import/extensions': "off",
        "eol-last": 2,
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
                "accessibility": "explicit",
                "overrides": {
                    "accessors": "explicit",
                    "constructors": "off",
                    "methods": "explicit",
                    "properties": "explicit",
                    "parameterProperties": "explicit",
                }
            }
        ],
        "max-lines-per-function": ['error', 40],
        "@typescript-eslint/member-ordering": [
            "error",
            {
              "default": [
                "field",
                "signature",
                "constructor",
                "method"
              ]
            }
          ],
                "import/prefer-default-export": [ "off"],
        "no-console": 0,
        "no-debugger": 0,
        "no-multiple-empty-lines": [
          "error",
          {
            "max": 2,
            "maxBOF": 0,
            "maxEOF": 1
          },
        ],
        "object-curly-spacing": ["warn", "always"],
        "spaced-comment": [
            "error",
            "always",
            {
              "markers": ["!", "?", "//", "todo", "*"]
            }
        ],
        "import/prefer-default-export": [ "off"],
        "no-console": 0,
        "no-debugger": 0,
        "no-multiple-empty-lines": [
          "error",
          {
            "max": 2,
            "maxBOF": 0,
            "maxEOF": 1
          }
        ],
        "object-curly-spacing": ["warn", "always"],
        "spaced-comment": [
            "error",
            "always",
            {
              "markers": ["!", "?", "//", "todo", "*"]
            }
        ]
    },
};
