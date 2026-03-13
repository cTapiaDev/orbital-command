export const authService = {
    login: async (email, password) => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                if (email === 'admin@orbital.com' && password === '123456') {
                    res({
                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNtZHIuIFNoZXBhcmQifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                        user: {
                            name: 'Cmdr. Shepard',
                            rank: 'Nivel 5',
                            avatar: 'user-astronaut',
                        },
                    })
                } else {
                    rej(new Error('Credenciales inválidas'))
                }
            }, 1000)
        })
    },
}
