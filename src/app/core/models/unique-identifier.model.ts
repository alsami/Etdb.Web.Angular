export class UniqueIdentifier {
    public static Empty = '00000000-0000-0000-0000-000000000000';
    private value: string;
    private static generator(characterCount) {
        let out = '';
        for (let i = 0; i < characterCount; i++) {
            // tslint:disable-next-line:no-bitwise
            out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return out;
    }
    public constructor(value: string | UniqueIdentifier) {
        if (!value) {
            throw new TypeError('value required!');
        }
        this.value = value instanceof UniqueIdentifier ? value.toString() : value;
    }
    public static isUniqueIdentifier(value: string | UniqueIdentifier): boolean {
        const validator = new RegExp('^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$', 'i');
        return value && (value instanceof UniqueIdentifier || validator.test(value.toString()));
    }
    public static create(): UniqueIdentifier {
        const generator = this.generator;
        return new UniqueIdentifier([generator(2), generator(1),
        generator(1), generator(1), generator(3)]
            .join('-'));
    }
    public static createAsString(): string {
        return UniqueIdentifier.createAsString().toString();
    }
    public toString(): string {
        return this.value;
    }
}
