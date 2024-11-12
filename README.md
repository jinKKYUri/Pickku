# JK 백엔드 개발 브랜치 (jk_be)

이 브랜치는 JK의 백엔드 개발 작업을 위한 브랜치입니다.

 jk_be
   ├─ .env
   ├─ README.md
   ├─ config
   │  ├─ db.js
   │  └─ testdb.js
   ├─ controllers
   │  ├─ authController.js
   │  └─ testController.js
   ├─ middlewares
   │  ├─ authMiddleware.js
   │  ├─ errorMiddleware.js
   │  └─ testMiddleware.js
   ├─ models
   │  ├─ testModel.js
   │  └─ userModel.js
   ├─ package-lock.json
   ├─ package.json
   ├─ routes
   │  ├─ authRoutes.js
   │  ├─ protectedRoutes.js
   │  └─ testRoutes.js
   ├─ server.js
   ├─ services
   │  ├─ authService.js
   │  └─ testService.js
   ├─ test
   │  └─ testdbconn.js
   └─ utils
      └─ tokenUtils.js