export class Slug {
    public value: string

    private constructor(value: string) {
        this.value = value
    }

    static create(value: string) {
        return new Slug(value)
    }

    /**
     * Receives a string and normalize it as a slug.
     *
     * Example: "An example title" => "an-example-title"
     *
     * @param text {string}
     */
    static createFromText(text: string): Slug {
        const slugText = text
            .normalize('NFKD')
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/_/g, '-')
            .replace(/--+/g, '-')
            .replace(/-$/g, '')

        return new Slug(slugText)
    }

    static createFromUserName(text: string): Slug {
        const userNameBase = text
            .toLowerCase() // Converte para minúsculas
            .replace(/\s+/g, '') // Substitui espaços por hífens
            .replace(/[^a-z0-9-]/g, '') // Remove caracteres especiais
            .replace(/--+/g, '-') // Remove hífens consecutivos
            .replace(/[;.,] /g, '')
            .trim() // Remove hífens no início e fim
            .padStart(text.length, '@')

        return new Slug(userNameBase)
    }
}
