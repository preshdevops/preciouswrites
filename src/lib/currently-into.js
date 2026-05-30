import db from "./db";

let tableInitialised = false;

// Initialize the currently_into table
export async function initCurrentlyInto() {
  if (tableInitialised) return;
  await db.execute(`
    CREATE TABLE IF NOT EXISTS currently_into (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT NOT NULL,
      sublabel TEXT NOT NULL DEFAULT '',
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);
  tableInitialised = true;
}

// Get all entries
export async function getCurrentlyInto() {
  await initCurrentlyInto();
  const result = await db.execute("SELECT * FROM currently_into ORDER BY id ASC");
  return result.rows.map((row) => ({
    id: row.id,
    label: row.label,
    sublabel: row.sublabel,
    updated_at: row.updated_at,
  }));
}

// Replace all entries with new ones (delete + insert in a batch)
export async function updateCurrentlyInto(entries) {
  await initCurrentlyInto();

  // Delete existing entries
  await db.execute("DELETE FROM currently_into");

  // Insert new entries
  for (const entry of entries) {
    if (!entry.label?.trim()) continue;
    await db.execute({
      sql: `INSERT INTO currently_into (label, sublabel, updated_at) VALUES (?, ?, datetime('now'))`,
      args: [entry.label.trim(), (entry.sublabel || "").trim()],
    });
  }

  return getCurrentlyInto();
}
