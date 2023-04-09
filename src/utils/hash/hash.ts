export abstract class Hash {
    abstract hash(password: string): Promise<string>
    abstract compare(password: string, userPassword: string): Promise<boolean>
}
