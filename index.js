module.exports = function nuxtSassResourcesLoader (moduleOptions = {}) {
    if (typeof moduleOptions === 'string' || Array.isArray(moduleOptions)) {
        moduleOptions = {resources: moduleOptions}
    }

    const options = Object.assign({}, {resources: this.options.sassResources}, moduleOptions)

    const sassResourcesLoader = {
        loader: 'sass-resources-loader', options
    }

    this.extendBuild((config, { isClient, isServer }) => {

        const lessLoader = config.module.rules.filter(({test}) => {
            return [ '/\\.less/'].indexOf(test.toString()) !== -1
        })

        const vueLoader = config.module.rules.find(({test}) => {
            return test.toString() === '/\\.vue$/'
        })

        const loaders = vueLoader.options.loaders;

        Object.keys(loaders).forEach(loader => {
            if (['less'].indexOf(loader) !== -1) {
                loaders[loader].push(sassResourcesLoader)
            }
        })

        Object.keys(lessLoader).forEach(loader => {
            lessLoader[loader].use.push(sassResourcesLoader)
        })

    })
}

module.exports.meta = require('./package.json')
