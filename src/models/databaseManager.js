import * as SQLite from 'expo-sqlite';

class DatabaseManager {
    static instance = null;
    db = null;

    static getInstance() {
        if (DatabaseManager.instance === null) {
        DatabaseManager.instance = new DatabaseManager();
        }
        return DatabaseManager.instance;
    }

    constructor() {
        this.db = SQLite.openDatabase('SyncDBLocal.db');
        this._initializeTables();
    }

    async insertHistory(userId, timestamp, equity, profit_loss, profit_loss_pct, base_value, timeframe) {
        return new Promise((resolve, reject) => {
        this.db.transaction(tx => {
            tx.executeSql(
            `
                INSERT INTO history (user_id, timestamp, equity, profit_loss, profit_loss_pct, base_value, timeframe)
                VALUES (?, ?, ?, ?, ?, ?, ?);
            `,
            [userId, timestamp, equity, profit_loss, profit_loss_pct, base_value, timeframe],
            (tx, resultSet) => {
                resolve(resultSet.insertId);
            },
            (error) => {
                reject(error);
            }
            );
        });
        });
    }

    async deleteDB() {
        this.db
    }

    async insertUser(dto) {
        const params = dto.get_user_list();
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    `INSERT OR IGNORE INTO user (id, email, phone, creator_status)
         VALUES (?, ?, ?, ?);`,
                params,
                (tx, resultSet) => {
                    console.log("inserted user", resultSet)
                    resolve(resultSet.insertId);
                },
                (error) => {
                    reject(error);
                }
                );
            });
        });
    }

    async getUser(id) {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    `
                        SELECT *
                        FROM user
                        WHERE id = ?
                    `,
                    [id],
                    (tx, resultSet) => {
                        resolve(resultSet.rows);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            });
        });
    }

  async _initializeTables() {
    await this.db.transaction(tx => {
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS user (
          id INTEGER PRIMARY KEY UNIQUE,
          email VARCHAR(50) UNIQUE NOT NULL,
          phone TEXT,
          creator_status BOOLEAN
        );
      `);
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          client_order_id VARCHAR(40) NOT NULL,
          created_at DATETIME NOT NULL,
          updated_at DATETIME NOT NULL,
          submitted_at DATETIME NOT NULL,
          filled_at DATETIME,
          expired_at DATETIME,
          canceled_at DATETIME,
          failed_at DATETIME,
          replaced_at DATETIME,
          replaced_by VARCHAR(40),
          replaces VARCHAR(40),
          asset_id VARCHAR(40) NOT NULL,
          symbol VARCHAR(10) NOT NULL,
          asset_class VARCHAR(20) NOT NULL,
          notional DECIMAL(15, 2) NOT NULL,
          qty DECIMAL(15, 8),
          filled_qty DECIMAL(15, 8) NOT NULL,
          filled_avg_price DECIMAL(15, 8),
          order_class VARCHAR(20) NOT NULL,
          order_type VARCHAR(20) NOT NULL,
          type VARCHAR(20) NOT NULL,
          side VARCHAR(10) NOT NULL,
          time_in_force VARCHAR(10) NOT NULL,
          limit_price DECIMAL(15, 8),
          stop_price DECIMAL(15, 8),
          status VARCHAR(20) NOT NULL,
          extended_hours BOOLEAN NOT NULL,
          legs TEXT,
          trail_percent DECIMAL(15, 8),
          trail_price DECIMAL(15, 8),
          hwm DECIMAL(15, 8),
          subtag VARCHAR(255),
          source VARCHAR(20) NOT NULL,
          FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE NO ACTION ON UPDATE NO ACTION
        );
      `);
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS history (
          user_id INT PRIMARY KEY,
          timestamp TIMESTAMP NOT NULL UNIQUE,
          equity DECIMAL(15, 2),
          profit_loss DECIMAL(15, 2),
          profit_loss_pct DECIMAL(15, 2),
          base_value DECIMAL(15, 2),
          timeframe CHAR(10),
          FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
        );
      `);
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS positions (
          user_id INTEGER PRIMARY KEY,
          asset_id VARCHAR(40),
          symbol CHAR(10),
          exchange CHAR(10),
          asset_class TEXT,
          avg_entry_price DECIMAL(15, 2),
          qty INT,
          qty_available INT,
          side CHAR(10),
          market_value DECIMAL(15, 2),
          cost_basis DECIMAL(15, 2),
          unrealized_pl DECIMAL(15, 2),
          unrealized_plpc DECIMAL(15, 2),
          unrealized_intraday_pl DECIMAL(15, 2),
          unrealized_intraday_plpc DECIMAL(15, 8),
          current_price DECIMAL(15, 2),
          lastday_price DECIMAL(15, 2),
          change_today DECIMAL(15, 8),
          FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
        );
      `);
    });
  }
}

export default DatabaseManager;