declare class IntlMessageFormat {
    constructor(message: string, locales: string | string[], formats?: any);
    format(context?: any): string;
    static defaultLocale: string;
}

export default IntlMessageFormat;
