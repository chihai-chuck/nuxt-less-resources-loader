_This package is a LESS port of [nuxt-sass-resources-loader](https://github.com/anteriovieira/nuxt-sass-resources-loader)_

# nuxt-less-resources-loader

This module does all the hard work of configuring [sass-resources-loader](https://github.com/shakacode/sass-resources-loader) for your nuxt application.

> `sass-resources-loader` @import your SASS resources into every required SASS module. So you can use your shared variables & mixins across all SASS lesses without manually importing them in each file. Made to work with CSS Modules!

## Install

```sh
npm i nuxt-less-resources-loader
# or
yarn add nuxt-less-resources-loader
```

## Usage

```js
// nuxt.config.js
import {resolve} from 'path'

module.exports = {
  modules: [
    // provide path to the file with resources
    ['nuxt-less-resources-loader', resolve(__dirname, 'path/to/resources.less')],

    // or array of paths
    ['nuxt-less-resources-loader', [
        resolve(__dirname, 'path/to/first-resources.less'),
        resolve(__dirname, 'path/to/second-resources.less'),
    ]],

    // or the native options
    ['nuxt-less-resources-loader', {
        resources: resolve(__dirname, 'path/to/resources.less')
    }],
  ],
}
```

or less resources option. require v1.1+

```js
// nuxt.config.js
import {resolve} from 'path'

module.exports = {
  modules: [
    'nuxt-less-resources-loader'
  ],
  lessResources: [
    resolve(__dirname, 'path/to/first-resources.less')
  ]
}
```

### Glob pattern matching

You can specify glob patterns to match your all of your files in the same directory.

```js
// Specify a single path
resources: './path/to/resources/**/*.less', // will match all files in folder and subdirectories
// or an array of paths
resources: [ './path/to/resources/**/*.less', './path/to/another/**/*.less' ]
```

> Note that less-resources-loader will resolve your files in order. If you want your variables to be accessed across all of your mixins you should specify them in first place.

```js
resources: [ './path/to/variables/vars.less', './path/to/mixins/**/*.less' ]
```

[For more details see the official documentation](https://github.com/shakacode/sass-resources-loader#usage)

## License

[MIT](http://opensource.org/licenses/MIT)
