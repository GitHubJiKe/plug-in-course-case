module.exports = {
    name: 'camel-case',
    call(text) {
        return require("change-case").camelCase(text);
    }
}