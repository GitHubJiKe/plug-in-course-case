module.exports = {
    name: 'pwd',
    call(text) {
        return text.replace(/[\S]/g, '*');
    }
}