import { LocalDate, DateTimeFormatter } from 'js-joda';
export default class Functions {
  static getDate(date) {
    if (date) {
      return new Date(date).toLocaleDateString();
    } else {
      return 'brak';
    }
  }
  static getEnochDay(date) {
    return LocalDate.parse(
      new Date(date).toLocaleDateString(),
      DateTimeFormatter.ofPattern('dd.MM.yyyy')
    ).toEpochDay();
  }
}
