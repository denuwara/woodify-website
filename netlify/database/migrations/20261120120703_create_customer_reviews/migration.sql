CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"order_reference" text NOT NULL,
	"rating" integer NOT NULL,
	"body" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "rating_range" CHECK ("rating" BETWEEN 1 AND 5),
	CONSTRAINT "review_status" CHECK ("status" IN ('pending', 'approved', 'rejected'))
);
