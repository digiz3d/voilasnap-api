import Redis from 'ioredis'

const client = new Redis({ host: 'localhost', port: 6379 })

export default client
