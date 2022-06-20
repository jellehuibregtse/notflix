import { Migration } from '@mikro-orm/migrations';

export class Migration20220620184832 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "account" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "email" varchar(255) not null);',
    );
    this.addSql(
      'alter table "account" add constraint "account_email_unique" unique ("email");',
    );
    this.addSql(
      'alter table "account" add constraint "account_pkey" primary key ("id");',
    );

    this.addSql(
      'create table "profile" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "account_id" varchar(255) not null);',
    );
    this.addSql(
      'alter table "profile" add constraint "profile_pkey" primary key ("id");',
    );

    this.addSql(
      'alter table "profile" add constraint "profile_account_id_foreign" foreign key ("account_id") references "account" ("id") on update cascade;',
    );
  }
}
