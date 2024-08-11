import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from './date-format.pipe';

@NgModule({
    declarations: [DateFormatPipe],
    imports: [CommonModule],
    exports: [DateFormatPipe]  // Exporta el pipe para que esté disponible en otros módulos
})
export class SharedModule { }