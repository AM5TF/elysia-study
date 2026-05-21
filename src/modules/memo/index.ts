import { Elysia, t } from 'elysia'
import { memoService } from './service.js'
import { CreateMemoInput, ErrorResponse, Memo, MemoParamsSchema, UpdateMemoInput } from './model.js'


export const memosRoute = new Elysia({
  prefix: '/memos'
})
  .get('/', () => {
    return memoService.getAll()
  }, {
    response: t.Array(Memo)
  })

  .get('/:id', ({ params, status }) => {
    const memo = memoService.findById(params.id)

    if (!memo) {
      return status(404, {
        message: 'メモが見つかりません'
      })
    }

    return memo
  }, {
    params: MemoParamsSchema,
    response: {
      200: Memo,
      404: ErrorResponse
    }
  })

  .post('/', ({ body, status }) => {
    const newMemo = memoService.create(body)

    return status(201, {
      message: 'メモを作成しました',
      memo: newMemo
    })
  }, {
    body: CreateMemoInput,
    response: {
      201: t.Object({
        message: t.String(),
        memo: Memo
      })
    }
  })

  .put('/:id', ({ params, body, status }) => {
    const updatedMemo = memoService.update(params.id, body)

    if (!updatedMemo) {
      return status(404, {
        message: 'メモが見つかりません'
      })
    }

    return {
      message: 'メモを更新しました',
      memo: updatedMemo
    }
  }, {
    params: MemoParamsSchema,
    body: UpdateMemoInput,
    response: {
      200: t.Object({
        message: t.String(),
        memo: Memo
      }),
      404: ErrorResponse
    }
  })

  .delete('/:id', ({ params, status }) => {
    const deletedMemo = memoService.delete(params.id)

    if (!deletedMemo) {
      return status(404, {
        message: 'メモが見つかりません'
      })
    }

    return {
      message: 'メモを削除しました',
      memo: deletedMemo
    }
  }, {
    params: MemoParamsSchema,
    response: {
      200: t.Object({
        message: t.String(),
        memo: Memo
      }),
      404: ErrorResponse
    }
  })