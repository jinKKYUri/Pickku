const request = require('supertest');
const server = require('../../server');
const jwt = require('jsonwebtoken');
const { registUserModel, deleteUserModel } = require('../../models/userModel');
require('dotenv').config();
//0 : 관리자 / 1 : 일반사용자 / 2 : 아티스트
describe('Protected Routes - JWT 인증 테스트', () => {
    let token;
    let userId;
    beforeAll(async () => {
        // 테스트용 사용자 생성
        const user = await registUserModel({
            userId: 'testuser',
            userMail: 'testuser@example.com',
            userPhone: '1234567890',
            userPw: 'testpassword',
        });

        userId = user.userId;
        console.log(userId);
        // JWT 토큰 생성 (로그인 후 생성되는 것처럼)
        token = jwt.sign({ id: userId, role: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' });

    });
    afterAll(async () => {
        server.close();
        await deleteUserModel(userId);
      });
    
    test('토큰 있을 경우 profile 접근 가능', async () => {
        const res = await request(server)
        .get('/profile')
        .set('Authorization', `Bearer ${token}`); 
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('프로필 정보'); 
        expect(res.body.user).toHaveProperty('id');
    });

    test('토큰이 없으면 인증 실패 테스트', async () => {
        const res = await request(server).get('/profile');

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('토큰이 없습니다. 로그인 해주세요.');
    });

    test('유효하지 않은 토큰을 사용한 접근 테스트', async () => {
        const res = await request(server)
        .get('/profile')
        .set('Authorization', 'Bearer invalidtoken');

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('유효하지 않은 토큰입니다.');
    });

    test('관리자 권한 o - /admin 접근 테스트', async () => {
        const adminToken = jwt.sign({ id: 1, role: 0 }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const res = await request(server)
        .get('/admin')
        .set('Authorization', `Bearer ${adminToken}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('관리자 페이지');
    });

    test('관리자 권한 x - /admin 접근 테스트', async () => {

        const res = await request(server)
        .get('/admin') 
        .set('Authorization', `Bearer ${token}`); 

        expect(res.status).toBe(403); 
        expect(res.body.message).toBe('접근 권한이 없습니다.');
    });

  

    
});
