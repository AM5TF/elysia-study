import { db } from '../../db/index.js'
import { memos } from '../../db/schema.js'
import { eq } from 'drizzle-orm'
import type {
  CreateMemoInput,
  UpdateMemoInput
} from './model.js'

export const memoService = {
  async getAll() {
    const result = await db.select().from(memos)
    return result
  },
  async findById(id: number) {
    const result = await db
      .select()
      .from(memos)
      .where(eq(memos.id, id))
    
    return result[0]
  },
  async create(input: CreateMemoInput) {
    const result = await db
      .insert(memos)
      .values({
        title: input.title,
        content: input.content ?? ''
      })
      .returning()
    
    return result[0]
  },
  async update(id: number, input: UpdateMemoInput) {
    const result = await db
      .update(memos)
      .set({
        title: input.title,
        content: input.content ?? ''
      })
      .where(eq(memos.id, id))
      .returning()

    return result[0]
  },
  async delete(id: number) {
    const result = await db
      .delete(memos)
      .where(eq(memos.id, id))
      .returning()

    return result[0]
  }
}