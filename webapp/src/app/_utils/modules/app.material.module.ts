import { NgModule } from '@angular/core'
import * as moment from 'moment'
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DateAdapter,
    NativeDateAdapter,
    MAT_DATE_FORMATS,
    MAT_NATIVE_DATE_FORMATS
} from '@angular/material'

const MATERIAL_MODULES = [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule
]

export class MyDateAdapter extends NativeDateAdapter {

    parse(value: any): Date | null {
        const timestamp = moment(value, 'DD/MM/YYYY').format('L');
        return timestamp === 'Invalid date' ? null : new Date(timestamp);
    }

    format(date: Date, displayFormat: Object): string {
        return this._to2digit(date.getDate()) + '/' + this._to2digit(date.getMonth() + 1) + '/' + date.getFullYear();
    }

    private _to2digit(n: number) {
        return ('00' + n).slice(-2);
    }
}

@NgModule({
    imports: [...MATERIAL_MODULES],
    exports: [...MATERIAL_MODULES],
    providers: [
        { provide: DateAdapter, useClass: MyDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }
    ],
})
export class AppMaterialModule { }

