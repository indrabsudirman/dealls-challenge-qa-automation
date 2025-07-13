import log from 'loglevel'

const isLogging = process.env.IS_LOGGING === 'true'

log.setLevel(isLogging ? 'info' : 'silent')

export default log
