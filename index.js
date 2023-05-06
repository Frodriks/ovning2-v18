// Bas grejer för backend
const dbDriver = require('better-sqlite3');

const db = dbDriver('bands.sqlite3');

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.static('frontend'));

/* Setup för GET/POST/PUT/DELETE */

// GET - bands

app.get('/api/bands', (req, res) => {
    const statement = db.prepare('SELECT * FROM bands');
    const bands = statement.all();
    res.json(bands);
});

// GET - albums

app.get('/api/albums', (req, res) => {
    const statement = db.prepare('SELECT * FROM albums');
    const albums = statement.all();
    res.json(albums);
});

// GET - members

app.get('/api/members', (req, res) => {
    const statement = db.prepare('SELECT * FROM members');
    const members = statement.all();
    res.json(members);
});

// POST - bands

app.post('/api/bands', (req, res) => {
    const band = req.body;
    const statement = db.prepare('INSERT INTO bands (band_name, formed_year, genre) VALUES (?, ?, ?)');
    const result = statement.run(band.band_name, band.formed_year, band.genre);
    res.json({ id: result.lastInsertRowid, success: true});
});

// POST - albums

app.post('/api/albums', (req, res) => {
    const albums = req.body;
    const statement = db.prepare('INSERT INTO albums (album_name, released_year, band_id) VALUES (? , ?, ?)');
    const result = statement.run(albums.album_name, albums.released_year, albums.band_id);
    res.json({ id: result.lastInsertRowid, success: true});
});

// POST - members

app.post('/api/members', (req, res) => {
    const members = req.body;
    const statement = db.prepare('INSERT INTO members (first_name, last_name, instrument, band_id) VALUES (?, ?, ?, ?)');
    const result = statement.run(members.first_name, members.last_name, members.instrument, members.band_id);
    res.json({ id: result.lastInsertRowid, success: true});
});

// PUT - bands

app.put('/api/bands/:id', (req, res) => {
    const band = req.body;
    const statement = db.prepare('UPDATE bands SET band_name = ?, formed_year = ?, genre = ? WHERE id = ?');
    const result = statement.run(band.band_name, band.formed_year, band.genre, req.params.id);
    res.json({changes: result.changes, success: true});
});

// PUT - albums

app.put('/api/albums/:album_id', (req,res) => {
    const album = req.body;
    const statement = db.prepare('UPDATE albums SET album_name = ?, released_year = ?, band_id = ? WHERE album_id = ?');
    const result = statement.run(album.album_name, album.released_year, album.band_id, req.params.album_id);
    res.json({changes: result.changes, success: true});
});

// PUT - members

app.put('/api/members/:member_id', (req, res) => {
    const member = req.body;
    const statement = db.prepare('UPDATE members SET first_name = ?, last_name = ?, instrument = ?, band_id = ? WHERE member_id = ?');
    const result = statement.run(member.first_name, member.last_name, member.instrument, member.band_id, req.params.member_id);
    res.json({changes: result.changes, success: true});
});

// DELETE - bands

app.delete('/api/bands/:id', (req, res) => {
    const statement = db.prepare('DELETE FROM bands WHERE id = ?');
    const result = statement.run(req.params.id);
    res.json({success: true});
});

// DELETE - albums

app.delete('/api/albums/:album_id', (req, res) => {
    const statement = db.prepare('DELETE FROM albums WHERE album_id = ?');
    const result = statement.run(req.params.album_id);
    res.json({success: true});
});

// DELETE - members
app.delete('/api/members/:member_id', (req, res) => {
    const statement = db.prepare('DELETE FROM members WHERE member_id = ?');
    const result = statement.run(req.params.member_id);
    res.json({success: true});
});


/* Starta serven */
app.listen(3000, console.log('Server started on port 3000'));