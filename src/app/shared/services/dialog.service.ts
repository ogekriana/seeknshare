import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    success(message: string = 'Data has been saved.') {
        return Swal.fire({
            title: 'Success!',
            text: message,
            type: 'success',
            timer: 2000
        });
    }
    confirm(message: string) {
        return Swal.fire({
            title: 'Are you sure?',
            text: message,
            type: 'warning',
            confirmButtonText: 'Yes',
            showCancelButton: true,
          });
    }
    info(message: string) {
        return Swal.fire({
            title: 'Oops!',
            text: message,
            type: 'info',
        });
    }
    error(message: string = 'Oop Something went wrong') {
        return Swal.fire({
            title: 'Oops',
            text: message,
            type: 'error'
        });
    }
}
