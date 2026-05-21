import { Elysia } from 'elysia'
import { node } from '@elysiajs/node'
import { memosRoute } from './modules/memo/index.js'
import { swagger } from '@elysiajs/swagger';

const app = new Elysia({ adapter: node() })
  .get('/', () => {
    return {
      message: 'Memo API is running'
    }
  })
  .use(memosRoute)
  .use(swagger({
    path: '/docs'
  }))
  .listen(3000)

console.log('Elysia server is running at http://localhost:3000')