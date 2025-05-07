// 일반 사용자 목업 데이터
export const normalUser = {
    id: 'user123',
    name: '김일반',
    email: 'user123@example.com',
    nickname: '일반사용자',
    role: 'USER',
    profileImage: null,
    phoneVerified: false,
    projects: [
        {
            id: 1,
            title: '로고 디자인 의뢰',
            status: '진행중',
            deadline: '2024.03.31',
            thumbnail: null
        },
        {
            id: 2,
            title: '명함 디자인 의뢰',
            status: '검토중',
            deadline: '2024.04.15',
            thumbnail: null
        }
    ]
};

// 전문가 사용자 목업 데이터
export const expertUser = {
    id: 'expert123',
    name: '박전문',
    email: 'expert123@example.com',
    nickname: '디자인전문가',
    role: 'EXPERT',
    profileImage: null,
    phoneVerified: true,
    expertInfo: {
        career: '경력 10년의 브랜딩 전문 디자이너',
        categories: ['로고 디자인', '브랜드 디자인', 'UI/UX'],
        portfolio: [
            {
                id: 1,
                title: '카페 브랜딩',
                image: null,
                description: '카페 로고 및 브랜드 디자인'
            },
            {
                id: 2,
                title: '앱 UI 디자인',
                image: null,
                description: '핀테크 앱 UI/UX 디자인'
            }
        ]
    },
    projects: [
        {
            id: 3,
            title: '식당 브랜딩 프로젝트',
            status: '진행중',
            deadline: '2024.04.01',
            thumbnail: null
        },
        {
            id: 4,
            title: '쇼핑몰 앱 디자인',
            status: '진행중',
            deadline: '2024.04.30',
            thumbnail: null
        }
    ]
}; 