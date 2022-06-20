import { Migration } from '@mikro-orm/migrations';

export class Migration20220620184239 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "movie" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "overview" text not null, "release_date" timestamptz(0) not null, "runtime" int not null, "poster_path" varchar(255) not null);',
    );
    this.addSql(
      'alter table "movie" add constraint "movie_pkey" primary key ("id");',
    );
  }
}
