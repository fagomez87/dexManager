const { faker } = require('@faker-js/faker')

export const generateFailingLogin = () => {
    return {
        user: faker.internet.username(),
        password: faker.internet.password()
    }
}
export const generateValidLogin = () => {
    return {
        user: "challengeqa",
        password: "Abcd1234"
    }
}