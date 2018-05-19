import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material';
import { AppService } from '../app.service'
import { Priorite, Statut } from '../_types'
import { AppUtilsService, HttpDefaultService } from 'app/_utils'
import { Router } from '@angular/router'
import * as uuid from 'uuid'
import * as THREE from 'three'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/map'
import { EgoDialogComponent } from '../dialog/ego/ego.component';


@Component({
  selector: 'app-ego',
  templateUrl: './ego.component.html',
  styleUrls: ['./ego.component.scss'],
  providers: [
    AppUtilsService
  ]
})
export class EgoComponent implements OnInit {

  nom: string
  prenom: string
  showSigns = false

  users = [
    {
      nom: '',
      prenom: ''
    }
  ]

  letters = [
    { code: "A", imgSrc: null, enter: false },
    { code: "B", imgSrc: null, enter: false }
  ]

  constructor(
    public appService: AppService,
    private _appUtilsService: AppUtilsService,
    private _httpService: HttpDefaultService,
    private _router: Router,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this._dialog.open(EgoDialogComponent, {
      data: {
      }
    })

    var camera, scene, renderer
    var geometry, material, mesh

    init()
    animate()

    function init() {

      camera = new THREE.PerspectiveCamera(70, window.innerWidth / (window.innerHeight * 0.65), 0.01, 10)
      camera.position.z = 0.3

      scene = new THREE.Scene()
      scene.background = new THREE.Color( 0x2e2e2e )

      geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
      material = new THREE.MeshNormalMaterial()

      mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight * 0.65)
      document.getElementById('canvas').appendChild(renderer.domElement)

    }

    function animate() {

      requestAnimationFrame(animate)

      mesh.rotation.x += 0.0
      mesh.rotation.y += 0.02

      renderer.render(scene, camera)

    }
  }

  onAddUserClick(){
    this.users.push({nom: '', prenom: ''})
  }

  onDeleteUserClick(user){
    this.users.splice(this.users.indexOf(user), 1)
  }

  generate() {

    this.appService.user.uuid = uuid.v4()

    const letter1 = this.prenom.toLocaleUpperCase().charAt(0)
    const letter2 = this.nom.toLocaleUpperCase().charAt(0)

  }

  onLetterClick (letter) {
    const index = this.letters.indexOf(letter)
    this.letters[index].imgSrc = this.generateLetter(letter)
  }

  onLetterMouseEnter(letter, event) {

    debugger

    // FIXME enter arrive en permanence

    const index = this.letters.indexOf(letter)
    if( this.letters[index].enter)
      return
    this.letters[index].imgSrc = this.generateLetter(letter)
    this.letters[index].enter = true
  }

  onLetterMouseLeave(letter) {

    const index = this.letters.indexOf(letter)
    this.letters[index].imgSrc = null
    this.letters[index].enter = false
  }

  private generateLetter(letter){
    return '../../assets/ego/letters/' + letter.code + Math.floor(Math.random() * Math.floor(4) + 1) + '.jpg'
  }
}