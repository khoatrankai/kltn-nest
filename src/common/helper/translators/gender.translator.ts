export function genderTranslator(gender: number, lang: string) {
    switch (lang) {
        case 'vi':
            return gender === 1 ? 'Nam' : 'Nữ';
        case 'en':
            return gender === 1 ? 'Male' : 'Female';
        case 'ko':
            return gender === 1 ? '남성' : '여성';
        default:
            return gender === 1 ? 'Nam' : 'Nữ';
    }
}