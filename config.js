const config = {
    dbUrl: process.env.DB_URL || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mongodb01.0rec43c.mongodb.net/test`,
    port: process.env.PORT || 3005,
    host: process.env.HOST || "http://localhost",
    dbName: process.env.DB_NAME || "tyseries",
    jwtSecret: process.env.JWT_SECRET || "tyseries-secret",
}

module.exports = config;