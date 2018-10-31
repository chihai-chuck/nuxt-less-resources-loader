const Module = require('module')

const defaults = {
    resources: []
}

module.exports = function nuxtSassResourcesLoader (moduleOptions = {}) {
    if (typeof moduleOptions === 'string' || Array.isArray(moduleOptions)) {
        moduleOptions = {resources: moduleOptions}
    }

    const options = Object.assign({}, {resources: this.options.lessResources}, moduleOptions)

    // Casts the provided resource as an array if it's not one.
    options.resources = Array.isArray(options.resources) ? options.resources : [options.resources]

    // Try to resolve using NPM resolve path first
    options.resources = options.resources.filter(r => !!r).reduce((resources, resource) => {
        resources.push(resolvePath.call(this.nuxt, resource))

        return resources
    }, [])

    const lessResourcesLoader = {
        loader: 'sass-resources-loader', options
    }

    const version = this.nuxt.constructor.version
    const [major] = version.split('.')

    this.extendBuild(config => {
        if (major === '1') {
            extendV1(config, { lessResourcesLoader })
        } else {
            extend(config, { lessResourcesLoader })
        }
    })
}

function extendV1(config, { lessResourcesLoader }) {
    const lessLoader = config.module.rules.filter(({ test = '' }) => {
        return ['/\\.less/'].indexOf(test.toString()) !== -1
    })
    const vueLoader = config.module.rules.find(({ test = '' }) => {
        return test.toString() === '/\\.vue$/'
    })

    const loaders = vueLoader.options.loaders

    Object.keys(loaders).forEach(loader => {
        if (['less'].indexOf(loader) !== -1) {
            loaders[loader].push(lessResourcesLoader)
        }
    })

    Object.keys(lessLoader).forEach(loader => {
        lessLoader[loader].use.push(lessResourcesLoader)
    })
}

function extend(config, { lessResourcesLoader }) {
    const lessLoaders = config.module.rules.filter(({ test = '' }) => {
        return ['/\\.less$/'].indexOf(test.toString()) !== -1
    })

    for (const lessLoader of lessLoaders) {
        for (const rule of lessLoader.oneOf) {
            rule.use.push(lessResourcesLoader)
        }
    }
}

// custom resolvePath nuxt.js/lib/core/nuxt.js
function resolvePath(_path) {
    try {
        const resolvedPath = Module._resolveFilename(_path, {
            paths: this.options.modulesDir
        })
        return resolvedPath
    } catch (error) {
        if (error.code !== 'MODULE_NOT_FOUND') {
            throw error
        }
    }

    return this.resolveAlias(_path)
}

module.exports.meta = require('./package.json')
