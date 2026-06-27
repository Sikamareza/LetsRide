CREATE TABLE IF NOT EXISTS zones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS stores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  zone_id INTEGER REFERENCES zones(id),
  latitude REAL,
  longitude REAL,
  active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS riders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  zone_id INTEGER REFERENCES zones(id),
  is_available INTEGER DEFAULT 1,
  current_lat REAL,
  current_lng REAL
);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  store_id INTEGER REFERENCES stores(id),
  rider_id INTEGER REFERENCES riders(id),
  customer_phone TEXT,
  delivery_lat REAL,
  delivery_lng REAL,
  status TEXT DEFAULT 'pending',
  base_price REAL DEFAULT 24.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
