CREATE TABLE "memos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "memos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(100) NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
