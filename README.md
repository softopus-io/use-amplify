//{
////  "singleQuote": true,
////  "jsxSingleQuote": true,
////  "semi": false,
////  "tabWidth": 2,
////  "bracketSpacing": true,
////  "jsxBracketSameLine": false,
////  "arrowParens": "always",
////  "trailingComma": "none"
//}

{
"compilerOptions": {
"outDir": "dist",
"module": "esnext",
"lib": ["dom", "esnext"],
"moduleResolution": "node",
"jsx": "react",
"sourceMap": true,
"declaration": true,
"esModuleInterop": true,
"noImplicitReturns": true,
"noImplicitThis": true,
"noImplicitAny": true,
"strictNullChecks": true,
"suppressImplicitAnyIndexErrors": true,
"noUnusedLocals": true,
"noUnusedParameters": true,
"allowSyntheticDefaultImports": true
},
"include": ["src"],
"exclude": ["node_modules", "dist", "example"]
}

# use-amplify

> Amplify Hooks

[![NPM](https://img.shields.io/npm/v/use-amplify.svg)](https://www.npmjs.com/package/use-amplify) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-amplify
```

## Usage

```tsx
import React, { Component } from 'react'

import MyComponent from 'use-amplify'
import 'use-amplify/dist/index.css'

class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```

## License

MIT © [Richard Pecha](https://github.com/Richard Pecha)
