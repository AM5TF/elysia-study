import { t, type UnwrapSchema } from "elysia"

export const ErrorResponse = t.Object({
  message: t.String()
})

export const MemoParamsSchema = t.Object({
  id: t.Number()
});

export const Memo = t.Object({
  id: t.Number(),
  title: t.String(),
  content: t.String()
})

export type Memo = UnwrapSchema<typeof Memo>;

export const CreateMemoInput = t.Object({
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

export type CreateMemoInput = UnwrapSchema<typeof CreateMemoInput>

export const UpdateMemoInput = t.Object({
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

export type UpdateMemoInput = UnwrapSchema<typeof UpdateMemoInput>

