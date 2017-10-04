/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { DemandeListComponent } from './demande-list.component'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'

describe('DemandeListComponent', () => {
  let component: DemandeListComponent
  let fixture: ComponentFixture<DemandeListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxDatatableModule
      ],
      declarations: [DemandeListComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
