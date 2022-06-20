import { Migration } from '@mikro-orm/migrations';

export class Migration20220620184743 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "password" varchar(255) not null, "roles" text[] not null);',
    );
    this.addSql(
      'alter table "user" add constraint "user_email_unique" unique ("email");',
    );
    this.addSql(
      'alter table "user" add constraint "user_pkey" primary key ("id");',
    );
  }
}
