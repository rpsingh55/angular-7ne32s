import { Component } from '@angular/core';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.css']
})
export class SeatBookingComponent {
  totalSeats: number = 80;
  seatsPerRow: number = 7;
  lastRowSeats: number = 3;
  seats: any[] = [];

  constructor() {
    this.initializeSeats();
  }

  initializeSeats() {
    let seatNumber = 1;
    for (let row = 1; row <= Math.ceil(this.totalSeats / this.seatsPerRow); row++) {
      const numSeatsInRow = row === Math.ceil(this.totalSeats / this.seatsPerRow) ? this.lastRowSeats : this.seatsPerRow;
      const rowSeats = [];
      for (let i = 1; i <= numSeatsInRow; i++) {
        rowSeats.push({ seatNumber: seatNumber++, available: true });
      }
      this.seats.push(rowSeats);
    }
  }

  reserveSeats(numSeats: number) {
    let seatsToBook: any[] = [];
    for (let row of this.seats) {
      seatsToBook = [];
      for (let seat of row) {
        if (seat.available) {
          seatsToBook.push(seat);
          if (seatsToBook.length === numSeats) {
            for (let bookedSeat of seatsToBook) {
              bookedSeat.available = false;
            }
            return seatsToBook;
          }
        } else {
          seatsToBook = [];
        }
      }
    }
    return null;
  }
}
