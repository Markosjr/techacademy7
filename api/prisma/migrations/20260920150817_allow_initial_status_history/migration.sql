-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StatusHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "requestId" TEXT NOT NULL,
    "changedById" TEXT NOT NULL,
    "previousStatus" TEXT,
    "newStatus" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StatusHistory_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "MaintenanceRequest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StatusHistory_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StatusHistory" ("changedById", "createdAt", "id", "newStatus", "note", "previousStatus", "requestId") SELECT "changedById", "createdAt", "id", "newStatus", "note", "previousStatus", "requestId" FROM "StatusHistory";
DROP TABLE "StatusHistory";
ALTER TABLE "new_StatusHistory" RENAME TO "StatusHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
