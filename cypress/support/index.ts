declare namespace Cypress{
    interface Chainable{
        typelogin: (url: string, email: string, password: string) => void
        editalsimples: () => void
        editalmedio: () => void
        editalmedioTermoEspecial: () => void
        editalMedioTituloMuitoTexto: () => void
        editalMedioDuracaoDeProjetosVazio: () => void
        editalMedioDuracaoDeProjetosNegativo: () => void
        editalsimples_sqlInjection: () => void
        editalcompleto: () => void
        editalcompletoIndicadoresAdicionados: () => void
    }
}
