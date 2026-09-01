export const DATABASE_NAME = 'expense_basic.db'

export  async function initDb(db) {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS expenses (
            id  INTEGER PRIMARY KEY AUTOINCREMENT,
            title   TEXT     NOT NULL,
            amount  INTEGER  NOT NULL,
            spent_at    TEXT    NOT NULL
        )
    `)
}

export function listExpense(db) {
    return db.getAllAsync('SELECT * FROM expenses ORDER BY id DESC')
}

export async function totalExpense(db) {
    const row = await db.getFirstAsync('SELECT SUM(amount) AS total FROM expenses')
    return row?.total ?? 0
}

export async function addExpenses(db, title, amount) {
    const today = new Date().toISOString().slice(0, 10);
    const result = await db.runAsync(
        'INSERT INTO expenses (title, amount, spent_at) VALUES (?, ?, ?)', [title, amount, today]
    )
    return result.lastInsertRowId
}
export async function deleteExpenses(db, id) {
    const result = await db.runAsync(
        'DELETE FROM expenses WHERE id = ?',[id])
    return result.changes;
}