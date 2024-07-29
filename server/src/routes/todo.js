const express = require('express');
const { Todo } = require('../db/models');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.findAll({ where: { userId: req.session.userId } });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findOne({ where: { id: req.params.id, userId: req.session.userId } });
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title } = req.body;
        const todo = await Todo.create({ title, userId: req.session.userId });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { title, completed } = req.body;
        const [updated] = await Todo.update(
            { title, completed },
            { where: { id: req.params.id, userId: req.session.userId } }
        );
        if (updated) {
            const updatedTodo = await Todo.findOne({ where: { id: req.params.id, userId: req.session.userId } });
            res.status(200).json(updatedTodo);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Todo.destroy({ where: { id: req.params.id, userId: req.session.userId } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
