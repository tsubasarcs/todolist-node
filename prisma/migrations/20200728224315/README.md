# Migration `20200728224315`

This migration has been generated by SeanShih at 7/28/2020, 10:43:15 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `todolist`.`items` (
`id` int NOT NULL  AUTO_INCREMENT,
`title` varchar(191)  ,
`finished` boolean NOT NULL DEFAULT false,
`created_at` datetime(3)  ,
`updated_at` datetime(3)  ,
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

DROP TABLE `todolist`.`todos`;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200728222908..20200728224315
--- datamodel.dml
+++ datamodel.dml
@@ -3,16 +3,16 @@
 }
 datasource db {
   provider = "mysql"
-  url = "***"
+  url = "***"
 }
-model Todo {
+model Item {
   id         Int       @default(autoincrement()) @id
   title      String?
   finished   Boolean   @default(false)
   createdAt  DateTime? @map(name: "created_at")
   updatedAt  DateTime? @map(name: "updated_at")
-  @@map(name: "todos")
+  @@map(name: "items")
 }
```


