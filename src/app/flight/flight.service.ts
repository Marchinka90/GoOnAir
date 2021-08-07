import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFlight } from '../shared/interfaces';

@Injectable({
    providedIn: 'root'
})

export class FlightService {

    constructor(
        private http: HttpClient
    ) { }

    saveFlight(data: any) {
        return this.http.post<IFlight>(`/api/flights`, data);
    }

    loadFlights(take?: number) {
        const query = take ? `?limit=${take}` : '';
        return this.http.get<{message: string, flights: IFlight[]}>(`/api/flights${query}`);
      }

}