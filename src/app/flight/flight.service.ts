import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFlight } from '../shared/interfaces';
import { map } from 'rxjs/operators';


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

    loadFlights(postPerPage: number, currentPage: number) {
        const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;
        return this.http.get<{message: string, flights: IFlight[], maxFlights: number}>(`/api/flights${queryParams}`)
        .pipe(map((resData) => {
            return {
                message: resData.message,
                flights: resData.flights.map((flight: any) => {
                    let flightId = flight._id;
                    delete flight['_id']        
                    return {
                        id: flightId,
                        ...flight
                    };
                }),
                maxFlights: resData.maxFlights,
            }; 
        }));
    }

    getFlight(flightId: string) {
        return this.http.get<{message: string, flight: IFlight | any}>(`/api/flights/${flightId}`)
        .pipe(map((resData) => {
            delete resData.flight['_id']
            return {
                message: resData.message,
                flight: {
                    id: flightId,
                    ...resData.flight
                }
            }; 
        }));
    }

    updateFlight(flightId: string, data: any) {
        return this.http.put<IFlight>(`/api/flights/${flightId}`, data);
    }

    deleteFlight(flightId: string) {
        return this.http.delete<IFlight>(`/api/flights/${flightId}`);
    }

    onBookingFlight(flightId: string) {
        return this.http.post<IFlight>(`/api/flights/book/${flightId}`, flightId);
    }
}