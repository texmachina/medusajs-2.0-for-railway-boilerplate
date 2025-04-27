import { Migration } from '@mikro-orm/migrations';

export class Migration20250426235112 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "approval" ("id" text not null, "cart_id" text not null, "type" text check ("type" in ('admin', 'sales_manager')) not null, "status" text check ("status" in ('pending', 'approved', 'rejected')) not null, "created_by" text not null, "handled_by" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "approval_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_approval_deleted_at" ON "approval" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "approval_settings" ("id" text not null, "company_id" text not null, "requires_admin_approval" boolean not null default false, "requires_sales_manager_approval" boolean not null default false, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "approval_settings_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_approval_settings_deleted_at" ON "approval_settings" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "approval_status" ("id" text not null, "cart_id" text not null, "status" text check ("status" in ('pending', 'approved', 'rejected')) not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "approval_status_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_approval_status_deleted_at" ON "approval_status" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "approval" cascade;`);

    this.addSql(`drop table if exists "approval_settings" cascade;`);

    this.addSql(`drop table if exists "approval_status" cascade;`);
  }

}
