export const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next(); // 다음 미들웨어
    } else {
        res.status(403).send('로그인 필요');
    }
};

export const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next(); // 로그인 안되어있으면 다음 미들웨어
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};