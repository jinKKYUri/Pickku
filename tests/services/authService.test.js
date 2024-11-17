const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerUser, authenticateUser } = require("../../services/authService");
const { createUser, getUserByUsername  } = require("../../models/userModel");
const { createUserProfile, getUserByNickname } = require("../../models/profileModel");

//모킹함수 - 실제 데이터베이스와의 상호작용 없이 가짜 데이터를 이용해 테스트할 수 있음
jest.mock("../../models/userModel", () => ({
    createUser: jest.fn(), 
    getUserByUsername: jest.fn(), 
}));

jest.mock("../../models/profileModel", () => ({
    createUserProfile: jest.fn(), 
    getUserByNickname: jest.fn(), 
}));
jest.mock("bcrypt", () => ({
    compare: jest.fn(),
    hash: jest.fn(),
}));
jest.mock("jsonwebtoken", () => ({
    sign: jest.fn(),
}));
describe("AuthService 테스트", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("registerUser 테스트", () => {
        const userData = {
            username: "testuser",
            nickname: "testname",
            email: "testuser@example.com",
            password: "password123",
            phone_number: "010-1234-5678",
        };
        test("이미 존재하는 사용자인 경우 error", async () => {
    
        //가짜 사용자 데이터를 반환
        getUserByUsername.mockResolvedValueOnce({ id: 1, username: "testuser" });

        await expect(registerUser(userData))
            .rejects
            .toThrow("이미 존재하는 사용자입니다.");
        });

        test("새로운 사용자 가입", async () => {
            //중복되는 아이디와 닉네임이 없을 경우 가정
            getUserByUsername.mockResolvedValueOnce(null);
            getUserByNickname.mockResolvedValueOnce(null);
            
            bcrypt.hash.mockResolvedValueOnce("hashedpassword");

            // 사용자 생성 함수 Mock
            createUser.mockResolvedValueOnce({
                id: 1,
                username: "testuser",
                email: "testuser@example.com",
                password: "hashedpassword",
                phone_number: "010-1234-5678",
            });

            // 프로필 생성 함수 Mock
            createUserProfile.mockResolvedValueOnce({
                user_id: 1,
                nickname: "testnickname",
                phone_number: "010-1234-5678",
                profile_picture: "default.png",
            });

            const result = await registerUser(userData);
            console.log(result);

            expect(getUserByUsername).toHaveBeenCalledWith("testuser");

            expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
            expect(createUser).toHaveBeenCalledWith({
                username: "testuser",
                email: "testuser@example.com",
                password: "hashedpassword", // 비밀번호는 해싱되므로 일치 여부만 확인
            });
            expect(createUserProfile).toHaveBeenCalledWith({
                user_id: 1,
                nickname: "testname",
                phone_number: "010-1234-5678",
                profile_picture: "default.png",
            });

        });
    });
    describe("authenticateUser 테스트", () => {
        const mockUser = {
            id: 1,
            username: "testuser",
            password: "hashedpassword", // bcrypt로 해시된 비밀번호
        };
        test("사용자가 존재하지 않을 때 오류 발생", async () => {
            getUserByUsername.mockResolvedValueOnce(null);
            await expect(authenticateUser("unknownuser", "password123"))
                .rejects.toThrow("사용자를 찾을 수 없습니다.");
            expect(getUserByUsername).toHaveBeenCalledWith("unknownuser");
        });
    
        test("비밀번호가 일치하지 않을 때 오류 발생", async () => {
            getUserByUsername.mockResolvedValueOnce(mockUser);
            bcrypt.compare.mockResolvedValueOnce(false);
    
            await expect(authenticateUser("testuser", "wrongpassword"))
                .rejects.toThrow("잘못된 비밀번호입니다.");
    
            expect(getUserByUsername).toHaveBeenCalledWith("testuser");
            expect(bcrypt.compare).toHaveBeenCalledWith("wrongpassword", mockUser.password);
        });
    
        test("정상적인 사용자 인증 및 JWT 토큰 반환", async () => {
            getUserByUsername.mockResolvedValueOnce(mockUser);
            bcrypt.compare.mockResolvedValueOnce(true);
            jwt.sign.mockReturnValueOnce("mockedToken");
    
            const result = await authenticateUser("testuser", "password123");
    
            expect(result).toBe("mockedToken");
            expect(getUserByUsername).toHaveBeenCalledWith("testuser");
            expect(bcrypt.compare).toHaveBeenCalledWith("password123", mockUser.password);
            expect(jwt.sign).toHaveBeenCalledWith(
                { id: mockUser.id, username: mockUser.username },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
        });       
    });
});