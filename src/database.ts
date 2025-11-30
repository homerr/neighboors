import Database from 'better-sqlite3';
import path from 'path';

// set the database path 
const dbPath = path.join(__dirname, '../data/complaints.db');

// create or open the database 
const db = new Database(dbPath);

// allow foreign keys 

db.pragma('foreign_keys = ON'); 

// set up schema 

export function initializeDatabase() {
    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS complaints (
        id INTERGER PRIMARY KEY AUTOINCREMENT,
        -- hillingdon local authority bits 
        date TEXT NOT NULL,
        time_start TEXT NOT NULL,
        time_end TEXT,
        description_of_nusisance TEXT NOT NULL,
        how_it_affected_you TEXT NOT NULL,
        -- internal bits 
        type_of_nuisance TEXT NOT NULL,
        location TEXT,
        private_notes TEXT,
        status TEXT DEFAULT 'open' CHECK(STATUS IN ('open', 'submitted', 'closed')),
        -- tracking
        submitted_date TEXT,
        authority_reference TEXT,
        -- system bits
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `;

    // make some indexes 
    const createIndexSQL = `
        CREATE INDEX IF NOT EXISTS idx_complaints_date
        ON complaints(date DESC);
    `;

    db.exec(createTableSQL);
    db.exec(createIndexSQL);

    console.log('Database set up properly, lets track some fools');
}

export default db;