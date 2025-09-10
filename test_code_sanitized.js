// Sanitized test code for CodePitamah analysis
// This version removes dangerous patterns while keeping the issues for analysis

// app.js - Node/Express with issues but no dangerous operations
const express = require("express");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

// ISSUE: Hardcoded secret (should come from env)
const JWT_SECRET = "superSecret123!"; // hardcoded secret

// ISSUE: Global array that grows forever => memory leak
const requestLog = [];

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root", // ISSUE: hardcoded DB creds
  database: "test",
  waitForConnections: true,
  connectionLimit: 2,
  queueLimit: 0,
});

// Quick-and-dirty templating
function html(body) {
  return `<!doctype html><html><body>${body}</body></html>`;
}

// CSRF-prone "state change" via GET
app.get("/admin/promote", async (req, res) => {
  // ISSUE: Auth bypass via debug header
  if (req.headers["x-debug"] === "1") {
    // treated as admin if header set
  } else if (!req.cookies.session) {
    return res.status(401).send("login first");
  }
  // ISSUE: CSRF (no token, GET mutates state)
  const user = req.query.user || "guest";
  // SANITIZED: Using parameterized query instead of string concatenation
  await pool.query("UPDATE users SET role='admin' WHERE username=?", [user]);
  res.send(html(`<h1>promoted ${user}</h1>`));
});

// N+1 query anti-pattern
app.get("/users-with-posts", async (req, res) => {
  // ISSUE: Algorithmic inefficiency (N+1)
  const [users] = await pool.query("SELECT id, username FROM users");
  const out = [];
  for (const u of users) {
    const [posts] = await pool.query(
      // SANITIZED: Using parameterized query
      "SELECT * FROM posts WHERE user_id = ?", [u.id]
    );
    out.push({ ...u, posts });
  }
  res.json(out);
});

// Classic search with parameterized query
app.get("/search", async (req, res) => {
  const q = req.query.q || "";
  // SANITIZED: Using parameterized query
  const [rows] = await pool.query(
    "SELECT * FROM products WHERE name LIKE ?", [`%${q}%`]
  );
  res.json(rows);
});

// Path traversal - SANITIZED with whitelist
app.get("/download", (req, res) => {
  const file = req.query.file || "readme.txt";
  // SANITIZED: Whitelist approach
  const allowedFiles = ["readme.txt", "docs.pdf", "guide.md"];
  if (!allowedFiles.includes(file)) {
    return res.status(400).send("File not allowed");
  }
  const safePath = path.join(__dirname, "../public", file);
  res.sendFile(safePath);
});

// Async/await anti-pattern + unhandled promise
app.get("/notify", (req, res) => {
  // ISSUE: fire-and-forget without error handling
  sendEmail(req.query.to, "Hi"); // missing await/try/catch
  res.send("queued");
});

async function sendEmail(to, body) {
  // ISSUE: magic numbers + fake retry loop w/ blocking sleep
  for (let i = 0; i < 3; i++) {
    const start = Date.now();
    // ISSUE: busy-wait (CPU contention)
    while (Date.now() - start < 200) {}
    if (Math.random() < 0.2) return true;
  }
  throw new Error("send failed");
}

// Resource contention: hammer the same row with locks
app.post("/transfer", async (req, res) => {
  const { fromId, toId, amount } = req.body;
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    // ISSUE: missing WHERE balance >= amount; possible negative balances
    await conn.query("UPDATE accounts SET balance = balance - ? WHERE id = ? FOR UPDATE", [amount, fromId]);
    await conn.query("UPDATE accounts SET balance = balance + ? WHERE id = ? FOR UPDATE", [amount, toId]);
    // ISSUE: long transaction window—artificial delay
    await new Promise(r => setTimeout(r, 500)); // amplifies lock contention
    await conn.commit();
    res.json({ ok: true });
  } catch (e) {
    await conn.rollback();
    res.status(500).json({ error: e.message });
  } finally {
    conn.release();
  }
});

// Log every request payload into unbounded array
app.post("/ingest", (req, res) => {
  // ISSUE: memory leak & sensitive data exposure
  requestLog.push({ ts: Date.now(), body: req.body });
  res.json({ size: requestLog.length });
});

app.listen(3000, () => console.log("bad-app on :3000"));

// routes/user.js - Duplicated logic + smells
async function calcScore(user) {
  // Cyclomatic complexity bait
  let score = 0;
  const age = user.age || 0;

  // ISSUE: magic numbers
  if (age > 18 && age < 25) score += 13;
  else if (age >= 25 && age < 35) score += 21;
  else if (age >= 35 && age < 50) score += 34;
  else score += 5;

  if (user.country === "IN") score += 7;
  else if (user.country === "US") score += 9;
  else if (user.country === "UK") score += 11;
  else score += 3;

  // Repeated business rule (duplicate)
  if ((user.role || "").toLowerCase() === "admin") score += 50;

  // Another deep nesting
  if (user.tags) {
    for (const t of user.tags) {
      if (t === "beta") score += 2;
      else if (t === "vip") {
        score += 8;
        if (user.referrals > 3) score += 4;
      } else if (t === "abuser") {
        if (user.reports > 10) score -= 20;
        else score -= 5;
      }
    }
  }

  // Same "admin" rule repeated (duplicate)
  if (user.role === "admin") score += 50;

  return score;
}

// util/auth.js - Auth bypass + weak crypto
const crypto = require("crypto");

// ISSUE: weak hashing & predictable salt
function hashPassword(pw) {
  const salt = "salty"; // hardcoded salt
  return crypto.createHash("md5").update(salt + pw).digest("hex");
}

// ISSUE: timing attack via direct string compare
function safeEqual(a, b) {
  return a === b; // not constant-time
}

// ISSUE: role derivation trusts client header
function getUser(req) {
  const name = req.headers["x-user"] || "guest";
  const role = req.headers["x-role"] || "user"; // trust client!
  return { name, role };
}

// worker/leak.js - Event emitter leak
const EventEmitter = require("events");
class Bus extends EventEmitter {}
const bus = new Bus();

// ISSUE: listener leak
function addPerRequestListener(reqId) {
  const handler = () => console.log("done for", reqId);
  bus.on("done", handler); // never removed
}
