import db from "./db";

// Initialize the posts table
export async function initDB() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      tags TEXT NOT NULL,
      readingTime TEXT NOT NULL,
      content TEXT NOT NULL,
      createdAt TEXT DEFAULT (datetime('now'))
    )
  `);
}

// Generate a URL-safe slug from a title
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Estimate reading time from content
function estimateReadingTime(content) {
  const text = content.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

// Format a row from the database into a post object
function formatPost(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    date: row.date,
    category: row.category,
    tags: JSON.parse(row.tags),
    readingTime: row.readingTime,
    content: row.content,
  };
}

// Get all posts, sorted by date (newest first)
export async function getAllPosts() {
  await initDB();
  const result = await db.execute("SELECT * FROM posts ORDER BY id DESC");
  return result.rows.map(formatPost);
}

// Get a single post by slug
export async function getPostBySlug(slug) {
  await initDB();
  const result = await db.execute({
    sql: "SELECT * FROM posts WHERE slug = ?",
    args: [slug],
  });
  if (result.rows.length === 0) return null;
  return formatPost(result.rows[0]);
}

// Get a single post by ID
export async function getPostById(id) {
  await initDB();
  const result = await db.execute({
    sql: "SELECT * FROM posts WHERE id = ?",
    args: [id],
  });
  if (result.rows.length === 0) return null;
  return formatPost(result.rows[0]);
}

// Create a new post
export async function createPost({ title, excerpt, category, tags, content }) {
  await initDB();
  const slug = slugify(title);
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  const readingTime = estimateReadingTime(content);
  const tagsJson = JSON.stringify(tags);

  const result = await db.execute({
    sql: `INSERT INTO posts (slug, title, excerpt, date, category, tags, readingTime, content)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [slug, title, excerpt, date, category, tagsJson, readingTime, content],
  });

  return { id: Number(result.lastInsertRowid), slug };
}

// Update an existing post
export async function updatePost(id, { title, excerpt, category, tags, content }) {
  await initDB();
  const slug = slugify(title);
  const readingTime = estimateReadingTime(content);
  const tagsJson = JSON.stringify(tags);

  await db.execute({
    sql: `UPDATE posts SET slug = ?, title = ?, excerpt = ?, category = ?, tags = ?, readingTime = ?, content = ?
          WHERE id = ?`,
    args: [slug, title, excerpt, category, tagsJson, readingTime, content, id],
  });

  return { slug };
}

// Delete a post
export async function deletePost(id) {
  await initDB();
  await db.execute({
    sql: "DELETE FROM posts WHERE id = ?",
    args: [id],
  });
}

// Seed database with posts from the static data file
export async function seedPosts(posts) {
  await initDB();

  for (const post of posts) {
    const existing = await db.execute({
      sql: "SELECT id FROM posts WHERE slug = ?",
      args: [post.slug],
    });

    if (existing.rows.length === 0) {
      const tagsJson = JSON.stringify(post.tags);
      await db.execute({
        sql: `INSERT INTO posts (slug, title, excerpt, date, category, tags, readingTime, content)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [post.slug, post.title, post.excerpt, post.date, post.category, tagsJson, post.readingTime, post.content],
      });
    }
  }
}
