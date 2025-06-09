const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Make sure the cookie name matches ('token')
        if (!token) {
            return res.status(401).json({ success: false, message: "Not authorized. Please login again." });
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (!tokenDecode?.id) {
            return res.status(401).json({ success: false, message: 'Invalid token. Please login again.' });
        }

        req.user = { id: tokenDecode.id }; // Standard practice to attach to req.user
        next();
    } catch (error) {
        console.error('Auth error:', error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Session expired. Please login again.' });
        }
        return res.status(401).json({ success: false, message: 'Not authorized. Please login again.' });
    }
}