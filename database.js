const mySql = require('mysql2')

const pool = mySql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin',
    database: 'notes_app'
}).promise()

const getNotes = async () => {
    const [notes] = await pool.query('SELECT * from notes')
    console.log(notes);
    return notes

}

const getNoteById = async (id) => {
    const [notes] = await pool.query(`SELECT * FROM notes WHERE id = ?`, [id])
    console.log(notes)
    return notes[0];
}



const createNote = async (title, contents) => {
    const note = await pool.query(`
    INSERT INTO notes (title, contents) VALUES (?, ?)`, [title, contents])
    const result = await getNoteById(note[0].insertId)
    return result;
}

// getNoteById(2);
createNote('wednesday', 'should finish the sql notes app')