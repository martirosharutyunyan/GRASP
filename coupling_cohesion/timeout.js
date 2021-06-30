const delay =  require('./delay')

module.exports = async msec => {
    const start = Date.now()
    await delay(msec)
    const time = Date.now() - start
    return `Timeout reached: ${time} >= ${msec}`;
};