import { Migration } from '@mikro-orm/migrations';

export class Migration20220404143129 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "movie" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "overview" varchar(255) not null, "release_date" timestamptz(0) not null, "runtime" int not null, "poster_path" varchar(255) not null);',
    );
    this.addSql(
      'alter table "movie" add constraint "movie_pkey" primary key ("id");',
    );

    this.addSql(
      'create table "genre" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);',
    );
    this.addSql(
      'alter table "genre" add constraint "genre_name_unique" unique ("name");',
    );
    this.addSql(
      'alter table "genre" add constraint "genre_pkey" primary key ("id");',
    );

    this.addSql(
      'create table "movie_genres" ("movie_id" varchar(255) not null, "genre_id" varchar(255) not null);',
    );
    this.addSql(
      'alter table "movie_genres" add constraint "movie_genres_pkey" primary key ("movie_id", "genre_id");',
    );

    this.addSql(
      'alter table "movie_genres" add constraint "movie_genres_movie_id_foreign" foreign key ("movie_id") references "movie" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "movie_genres" add constraint "movie_genres_genre_id_foreign" foreign key ("genre_id") references "genre" ("id") on update cascade on delete cascade;',
    );
  }
}
