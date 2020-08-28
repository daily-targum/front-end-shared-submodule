import dayjs from 'dayjs';
import { 
  formatDate, 
  formatDateAbriviated, 
  capitalizeWords, 
  camelCaseToCapitalized, 
  camelCaseToHyphenated,
   hyphenatedToCamelCase, 
   hyphenatedToCapitalized, 
   capitalizedToHypenated, 
   secondsToTimeCode 
} from '../format';
import { getRandomInt} from '../number';

// export function capitalizeWords(str: string){
//   return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
//  }
 
// export function camelCaseToCapitalized(str: string) {
//   return capitalizeWords(str.replace(/([A-Z])/, ' $1'));
// }

// export function camelCaseToHyphenated(str: string) {
//   return str.replace(/([A-Z])/, '-$1').toLowerCase();
// }

// export function hyphenatedToCapitalized(str: string) {
//   return capitalizeWords(str.replace(/-/g, ' '));
// }

// export function hyphenatedToCamelCase(str: string) {
//   return str.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase())
// }

// export function capitalizedToHypenated(str: string) {
//   return str.replace(/\s([A-Z])/g, '-$1').toLowerCase();
// }

// export function secondsToTimeCode(seconds: number) {   
//   // Hours, minutes and seconds
//   let hrs = ~~(seconds / 3600);
//   let mins = ~~((seconds % 3600) / 60);
//   let secs = ~~seconds % 60;

//   // Output like "1:01" or "4:03:59" or "123:03:59"
//   let ret = "";

//   if (hrs > 0) {
//     ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
//   }

//   ret += "" + mins + ":" + (secs < 10 ? "0" : "");
//   ret += "" + secs;
//   return ret;
// }

describe('format', () => {

  it('capitalizeWords', () => {
    expect(capitalizeWords('this is a test')).toBe('This Is A Test');
  });

  it('camelCaseToCapitalized', () => {
    expect(camelCaseToCapitalized('thisIsATest')).toBe('This Is A Test');
  });

  it('camelCaseToHyphenated', () => {
    expect(camelCaseToHyphenated('thisIsATest')).toBe('this-is-a-test');
  });

  it('hyphenatedToCapitalized', () => {
    expect(hyphenatedToCapitalized('this-is-a-test')).toBe('This Is A Test');
  });

  it('hyphenatedToCamelCase', () => {
    expect(hyphenatedToCamelCase('this-is-a-test')).toBe('thisIsATest');
  });

  it('capitalizedToHypenated', () => {
    expect(capitalizedToHypenated('This Is A Test')).toBe('this-is-a-test');
  });

  it('secondsToTimeCode', () => {
    const minutes = getRandomInt(0, 59);
    const seconds = getRandomInt(0, 59);

    const computedSeconds = minutes * 60 + seconds;

    // expect(secondsToTimeCode(computedSeconds)).toBe();
  });


  describe('formatDateAbriviated', () => {

    it('now', () => {
      const date = dayjs();
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe('Now');
    });
  
    it('one minute ago', () => {
      const date = dayjs().subtract(1, 'minute');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe('1 minute ago');
    });
  
    it('ten minutes ago', () => {
      const date = dayjs().subtract(10, 'minute');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe('10 minutes ago');
    });
  
    it('thirty minutes ago', () => {
      const date = dayjs().subtract(30, 'minute');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe('30 minutes ago');
    });
  
    it('fifty minutes ago', () => {
      const date = dayjs().subtract(50, 'minute');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe('50 minutes ago');
    });
  
    it('one hour ago', () => {
      const date = dayjs().subtract(1, 'hour');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe('1 hour ago');
    });
  
    it('two hours ago', () => {
      const date = dayjs().subtract(2, 'hour');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe('2 hours ago');
    });
  
    it('twelve hours ago', () => {
      const date = dayjs().subtract(12, 'hour');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe('12 hours ago');
    });
  
    it('twenty-three hours ago', () => {
      const date = dayjs().subtract(23, 'hour');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe('23 hours ago');
    });
  
    it('one week ago', () => {
      const date = dayjs().subtract(1, 'week');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe(date.format('MMM D'));
    });
  
    it('two week ago', () => {
      const date = dayjs().subtract(2, 'week');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe(date.format('MMM D'));
    });
  
    it('one year ago', () => {
      const date = dayjs().subtract(1, 'year');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe(date.format('MMM D YYYY'));
    });
  
    it('two years ago', () => {
      const date = dayjs().subtract(2, 'year');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe(date.format('MMM D YYYY'));
    });
  
  });
  
  
  const DATE_FORMAT = 'MMM D, YYYY, h:mm A';
  describe('formatDate', () => {
  
    it('now', () => {
      const date = dayjs();
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('one minute ago', () => {
      const date = dayjs().subtract(1, 'minute');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('ten minutes ago', () => {
      const date = dayjs().subtract(10, 'minute');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('thirty minutes ago', () => {
      const date = dayjs().subtract(30, 'minute');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('fifty minutes ago', () => {
      const date = dayjs().subtract(50, 'minute');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('one hour ago', () => {
      const date = dayjs().subtract(1, 'hour');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('two hours ago', () => {
      const date = dayjs().subtract(2, 'hour');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('twelve hours ago', () => {
      const date = dayjs().subtract(12, 'hour');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('twenty-three hours ago', () => {
      const date = dayjs().subtract(23, 'hour');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('one week ago', () => {
      const date = dayjs().subtract(1, 'week');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('two week ago', () => {
      const date = dayjs().subtract(2, 'week');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('one year ago', () => {
      const date = dayjs().subtract(1, 'year');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('two years ago', () => {
      const date = dayjs().subtract(2, 'year');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
  });

});