declare namespace Cypress{
    interface Chainable{
        typelogin: (url: string, email: string, password: string) => void
        editalsimples: () => void
    }
}
