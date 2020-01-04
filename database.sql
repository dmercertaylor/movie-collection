CREATE TABLE "movie" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(127) NOT NULL,
    "release_date" DATE NOT NULL,
    "run_time" INTERVAL NOT NULL,
    "poster" VARCHAR(127)
);

CREATE TABLE "genre" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(63)
);

CREATE TABLE "movie_genre" (
	"movie_id" INT REFERENCES "movie",
	"genre_id" INT REFERENCES "genre",
    PRIMARY KEY ("movie_id", "genre_id")
);