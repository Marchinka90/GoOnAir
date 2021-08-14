import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

    transform(value: string, lenght: number): unknown {
        return value.length > lenght ? `${value.substr(0, lenght)}...` : value;
    }

}