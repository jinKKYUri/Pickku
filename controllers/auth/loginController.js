const {
    naverAuthService,
    loginService } = require('../../services/auth/userService');


// 로컬 로그인
async function localLoginController(req, res) {
    try {
        const { mail, password } = req.body;
        const result = await loginService(mail, password);
        if (result.token) {
            const token = result.token;
            res.status(200).json({ message: '로그인 성공', data: result });
        }
    } catch (error) {
        console.log("error : authenticateUserController")
        console.log(error);
    }
}

// 네이버 로그인
async function naverLoginController(req, res) {
    try {
        const { code, state } = req.body;

        // 서비스 호출
        const result = await naverAuthService(code, state);
        console.log(result);
        res.status(200).json({ ...result });
    } catch (error) {
        console.error("네이버 로그인 오류:", error);
        res.status(500).json({ success: false, message: "네이버 로그인 실패" });
    }
}


module.exports = {
    localLoginController,
    naverLoginController
}