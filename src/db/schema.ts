import { integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const memos = pgTable('memos', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title', { length: 100 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow()
})

export type Memo = typeof memos.$inferSelect
export type NewMemo = typeof memos.$inferInsert