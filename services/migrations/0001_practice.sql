-- SOVERIX Practice Games (isolated from the eight-game provider and Sharika wallets)
-- Created for free practice only; no purchases, exchanges, cash-out, withdrawal or transfer.
CREATE TABLE IF NOT EXISTS players (
  id TEXT PRIMARY KEY,
  token_hash TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  balance INTEGER NOT NULL DEFAULT 1000000 CHECK (balance BETWEEN 0 AND 1000000000),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_refill_at TEXT NOT NULL DEFAULT '1970-01-01 00:00:00'
);
CREATE TABLE IF NOT EXISTS rounds (
  id TEXT PRIMARY KEY,
  player_id TEXT NOT NULL REFERENCES players(id),
  request_id TEXT NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('slots','roulette')),
  stake INTEGER NOT NULL,
  payout INTEGER NOT NULL,
  result_json TEXT NOT NULL,
  bets_json TEXT NOT NULL,
  balance_after INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(player_id, request_id)
);
CREATE INDEX IF NOT EXISTS idx_rounds_player_date ON rounds(player_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_players_last_seen ON players(last_seen_at);
CREATE INDEX IF NOT EXISTS idx_rounds_created ON rounds(created_at DESC);
