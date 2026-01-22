export function translate(text: string, translationKey?: string, ...args: (string | number)[]): string {
    try {
        const wpTranslations = window?.WP_Seatreg_Companion?.translations; //From SeatReg plugin companion translations
        const translated = translationKey && wpTranslations?.[translationKey] ? wpTranslations[translationKey] : text;

        return args.reduce<string>((str, arg) => str.replace('%s', String(arg)), translated);
    } catch(err) {
        console.error('Error in translate():', err);

        return text;
    } 
}