import { Elysia, status, t } from 'elysia'
import { memoService } from './service.js'
import { db } from '../../db/index.js'

const memoBodySchema = t.Object({
  title: t.String({
    minLength: 1,
    maxLength: 100
  }),
  content: t.Optional(
    t.String({
      maxLength: 1000
    })
  )
})

const memoParamsSchema = t.Object({
  id: t.Number()
})

export const memosRoute = new Elysia({
  prefix: '/memos'
})
  .get('/', async () => {
    const memoList = await memoService.getAll()
    return memoList
  })
  .get('/:id', async ({ params, status }) => {
    const memo = await memoService.findById(params.id)

    if(!memo) {
      return status(404, {
        message: 'メモが見つからない'
      })
    }

    return memo
  }, {
    params: memoParamsSchema
  })
  .post('/', async ({ body, status }) => {
    const newMemo = await memoService.create(body)

    return status(201, {
      message: 'メモを作成した',
      memo: newMemo
    })
  }, {
    body: memoBodySchema
  })
  .put('/:id', async ({ params, body, status }) => {
    const updatedMemo = await memoService.update(params.id, body)

    if(!updatedMemo) {
      return status(404, {
        message: 'メモが見つからない'
      })
    }

    return {
      message: 'メモを更新した',
      memo: updatedMemo
    }
  }, {
    params: memoParamsSchema,
    body: memoBodySchema
  })
  .delete('/:id', async ({ params, status }) => {
    const deletedMemo = await memoService.delete(params.id)

    if(!deletedMemo) {
      return status(404, {
        message: 'メモが見つからない'
      })
    }

    return {
      message: 'メモを削除した',
      memo: deletedMemo
    }
  }, {
    params: memoParamsSchema
  })