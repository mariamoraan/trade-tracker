import i18n from 'i18next';

export const stringToDate = (stringDate: string): Date => {
    const date = new Date(stringDate)
    return date
}

export const dateToFormattedString = (date: Date, lang: string): string => {
    return date.toLocaleDateString(lang, { weekday:"long", month:"short", day:"numeric"})
}

export const stringToFormattedDate = (stringDate: string, lang: string): string => {
    let date = stringToDate(stringDate)
    return date.toLocaleDateString(lang, { weekday:"long", month:"numeric", day:"numeric", year:"numeric"})
}

export const areDatesEqual = (stringDate1: string, stringDate2: string): boolean => {
    let date1 = stringToDate(stringDate1)
    let date2 = stringToDate(stringDate2)
    if (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    ) {
        return true
    }
    else {
        return false
    }
}

export const isTodayByString = (stringDate: string): boolean => {
    let date = stringToDate(stringDate)
    let currentDate = new Date()
    if (
        date.getDate() === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()
    ) {
        return true
    }
    return false
}

export const dateToFormattedStringOrDay = (stringDate: string, lang: string): string => {
    if (isTodayByString(stringDate)) return i18n.t("today")
    return stringToFormattedDate(stringDate, lang)
}