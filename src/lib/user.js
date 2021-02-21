class User {
    constructor() {
        this.userId = "";
    }

    setUserId(value) {
        this.userId = value;
    }

    getUserId() {
        return this.userId;
    }
}

module.exports = User;
