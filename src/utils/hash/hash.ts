export abstract class Hash {
    abstract hash(password: string): Promise<string>
}