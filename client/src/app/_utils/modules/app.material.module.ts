import { NgModule } from '@angular/core'
import * as moment from 'moment'
import {
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDialogModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdSelectModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdSliderModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    MdExpansionModule,
    MdDatepickerModule,
    MdNativeDateModule,
    DateAdapter,
    NativeDateAdapter,
    MD_DATE_FORMATS,
    MD_NATIVE_DATE_FORMATS
} from '@angular/material'

const MATERIAL_MODULES = [
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDialogModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdSelectModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdSliderModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    MdExpansionModule,
    MdDatepickerModule,
    MdNativeDateModule
]

export class MyDateAdapter extends NativeDateAdapter {

    parse(value: any): Date | null {
        let timestamp = moment(value, "DD/MM/YYYY").format('L');
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
        { provide: MD_DATE_FORMATS, useValue: MD_NATIVE_DATE_FORMATS }
    ],
})
export class AppMaterialModule { }

