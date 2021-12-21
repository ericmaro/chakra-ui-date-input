# chakra-ui-date-input

> Date Input Component for chakra UI library

[![NPM](https://img.shields.io/npm/v/chakra-ui-date-input.svg)](https://www.npmjs.com/package/chakra-ui-date-input) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save chakra-ui-date-input
```

## Usage

```tsx
import React, { Component } from 'react'

import {DatePicker} from 'chakra-ui-date-input'

class Example extends Component {
  render() {
    return <DatePicke
              placeholder='Date picker placeholder'
              name='date'
              onChange={(date: string) => console.log(date)}
            />
  }
}
```

## License

MIT © [ericmaro](https://github.com/ericmaro)
