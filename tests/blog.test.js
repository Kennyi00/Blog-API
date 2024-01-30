const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const User = require('../models/user');
const Post = require('../models/post')



let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

beforeEach(async () => {
 
    await User.deleteMany({});
});

describe('User Controller Tests', () => {
   
    test('should register a new user', async () => {
        const response = await request(app)
            .post('/user/register')
            .send({
                username: 'JohnDoe',
                email: 'john.doe@example.com',
                password: 'password123',
            });

        console.log(response.body.user.password)

        expect(response.statusCode).toBe(200)
        expect(response.body.user.username).toEqual('JohnDoe')
        expect(response.body.user.email).toEqual('john.doe@example.com')
        expect(response.body).toHaveProperty('token')
    });

    
    test('should login a user', async () => {
        const user = new User({
            username: 'JohnDoe',
            email: 'john.doe@example.com',
            password: 'password123',
            level: 1,
        });
        await user.save();

        const response = await request(app)
            .post('/user/login')
            .send({ email: 'john.doe@example.com', password: 'password123' })

        expect(response.statusCode).toBe(200)
        expect(response.body.user.username).toEqual('JohnDoe')
        expect(response.body.user.email).toEqual('john.doe@example.com')
        expect(response.body).toHaveProperty('token')
    });

   
    test('should update a user', async () => {
        const user = new User({
            username: 'JohnDoe',
            email: 'john.doe@example.com',
            password: 'password123',
            level: 1,
        });
        await user.save();
        const token = await user.generateAuthToken();

        const response = await request(app)
            .put(`/user/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ username: 'JaneDoe', email: 'jane.doe@example.com' })

        expect(response.statusCode).toBe(200)
        expect(response.body.username).toEqual('JaneDoe')
        expect(response.body.email).toEqual('jane.doe@example.com')
    });

test('It should delete a user', async () => {
    const user = new User({ username: 'John Doe', email: 'john.doe@example.com', password: 'password123', level: 1 })
    await user.save()
    const token = await user.generateAuthToken()

    const response = await request(app)
      .delete(`/user/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
    
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toEqual('User Deleted')
  })

})



//POST TEST
describe('User Controller Tests', () => {
   
    test('Should make a new POST', async () => {
        const response = await request(app)
            .post('/post/create')
            .send({
                description: 'FOOD',
                title: 'GOOD FOOD',
            });
        expect(response.statusCode).toBe(200)
        expect(response.body.description).toEqual('FOOD')
        expect(response.body.title).toEqual('GOOD FOOD')
    })
})


test('should update a POST', async () => {
    const post = new Post({
       title: 'FOOD',
       description: 'Food GOOD',
    });
    await post.save();
    const response = await request(app)
        .put(`/post/${post._id}`)
        .send({ title: 'FOOD', description: 'Food GOOD' })

    expect(response.statusCode).toBe(200)
    expect(response.body.title).toEqual('FOOD')
    expect(response.body.description).toEqual('Food GOOD')
});



test('It should delete a POST', async () => {
    const post = new Post({ title: 'FOOD', description: 'Good Food', username: 'password123' })
    await post.save()

    const response = await request(app)
      .delete(`/post/${post._id}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.message).toEqual('Post Deleted')
  })
