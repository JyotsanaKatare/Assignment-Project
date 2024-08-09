
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/server'); // Adjust the path if necessary
const Assignment = require('../../src/models/Assignment');
const User = require('../../src/models/User');

describe('Student Endpoints', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await User.create([
            { _id: '600000000000000000000001', role: 'principal' },
            { _id: '600000000000000000000002', role: 'student' },
            { _id: '600000000000000000000003', role: 'teacher' },
        ]);
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    it('should create a new assignment', async () => {
        const res = await request(app)
            .post('/student/assignments')
            .set('x-principal', JSON.stringify({ student_id: '600000000000000000000002' }))
            .send({ content: 'New Assignment' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('data');
    });
});
