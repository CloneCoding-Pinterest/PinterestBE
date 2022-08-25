class User {
    username;
    age;

    constructor(username, age) {
        this.username = username;
        this.age = age;
    }

    getUsername() {
        return this.username;
    }
}

module.exports = User;
