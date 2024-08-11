import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
    transform(value: any, format: string = 'YYYY-MM-DD', timeAgo: boolean = false): string {
        
        value = moment(value);

        if (timeAgo) {
            return value.fromNow();
        }

        return value.format(format);
    }
}