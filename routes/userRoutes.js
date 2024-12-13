const express = require('express');
const { findUserById, updateUser, deleteUser, users } = require('../models/userModel');
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieve all users
 *     description: Retrieve a list of all users from the system.
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get('/', (req, res) => {
    res.status(200).json(users);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieve a single user by ID
 *     description: Retrieve a single user based on the given ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: A single user object.
 *       404:
 *         description: User not found.
 */
router.get('/:id', (req, res) => {
    const user = findUserById(parseInt(req.params.id));
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a user by ID
 *     description: Update the information of an existing user.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Updated username.
 *               password:
 *                 type: string
 *                 description: Updated password.
 *     responses:
 *       200:
 *         description: Successfully updated user.
 *       404:
 *         description: User not found.
 */
router.put('/:id', (req, res) => {
    const user = updateUser(parseInt(req.params.id), req.body);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user by ID
 *     description: Delete a specific user from the system by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted user.
 *       404:
 *         description: User not found.
 */
router.delete('/:id', (req, res) => {
    const user = deleteUser(parseInt(req.params.id));
    if (user) {
        res.status(200).json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;
