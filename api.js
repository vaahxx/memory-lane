const express = require("express");
const sqlite3 = require("sqlite3");
const cors = require("cors");

const port = 4001;
const app = express();
const db = new sqlite3.Database("memories.db");

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(
  cors({
    origin: "*",
  })
);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS memories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      timestamp DATE,
      user_id INTEGER,
      image_url TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      biography TEXT,
      timestamp DATE
    )
  `);
});

app.get("/memories", (req, res) => {
  db.all("SELECT * FROM memories", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ memories: rows });
  });
});

app.post("/memories", (req, res) => {
  const { title, description, user_id, image_url } = req.body;

  if (!title || !description || !user_id) {
    return res.status(400).json({
      error: "All fields are required: title, description, userId",
    });
  }

  const timestamp = new Date().toISOString();

  const insert = db.prepare(
    "INSERT INTO memories (title, description, timestamp, user_id, image_url) VALUES (?, ?, ?, ?, ?)"
  );
  insert.run(title, description, timestamp, user_id, image_url, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Memory created successfully" });
  });
});

app.get("/memories/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM memories WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "Memory not found" });
    }
    res.json({ memory: row });
  });
});

app.put("/memories/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, timestamp } = req.body;

  if (!title || !description || !timestamp) {
    return res.status(400).json({
      error: "All fields are required: title, description, timestamp",
    });
  }

  const update = db.prepare(
    "UPDATE memories SET title = ?, description = ?, timestamp = ? WHERE id = ?"
  );
  update.run(title, description, timestamp, id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Memory updated successfully!" });
  });
});

app.delete("/memories/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM memories WHERE id = ?", [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Memory deleted successfully" });
  });
});

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users WHERE id = ?", [id], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows[0]);
    });
  });
};

app.get("/user-memories/:id", async (req, res) => {
  const { id } = req.params;
  const { sortBy } = req.query;
  const newer = "DESC";
  const older = "ASC";
  const sort = sortBy === "newer" ? newer : older;
  const user = await getUser(id);

  db.all(
    `SELECT * FROM memories WHERE user_id = ? ORDER BY timestamp ${sort}`,
    [id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        user: {
          ...user,
          memories: rows,
        },
      });
    }
  );
});

app.post("/users", (req, res) => {
  const { name, biography } = req.body;

  if (!name || !biography) {
    return res.status(400).json({
      error: "All fields are required: name, biography",
    });
  }

  const timestamp = new Date();

  const insert = db.prepare(
    "INSERT INTO users (name, biography, timestamp) VALUES (?, ?, ?)"
  );

  insert.run([name, biography, timestamp], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const select = db.prepare("SELECT last_insert_rowid() as id");
    select.get((err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const id = row.id;

      res.status(201).json({
        id,
        name,
        biography,
      });
    });
  });
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  let user, memories;

  await db.all("SELECT * FROM users WHERE id = ?", [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    user = rows[0];
  });

  await db.all(
    "SELECT * FROM memories WHERE user_id = ?",
    [id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      memories = rows;
    }
  );

  res.status(200).json({ user, memories });
});

app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const { biography } = req.body;
  const timestamp = new Date();

  if (!biography) {
    return res.status(400).json({
      error: "Biography is required.",
    });
  }

  const update = db.prepare(
    "UPDATE users SET biography = ?, timestamp = ? WHERE id = ?"
  );
  update.run(biography, timestamp, id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Biography is updated successfully!" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
