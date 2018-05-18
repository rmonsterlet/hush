import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { AppService } from '../app.service'
import { Priorite, Statut } from '../_types'
import { AppUtilsService, HttpDefaultService } from 'app/_utils'
import { Router } from '@angular/router'
import * as uuid from 'uuid'
import * as THREE from 'three'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/map'

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

  egoForm: FormGroup

  constructor(
    public appService: AppService,
    private _appUtilsService: AppUtilsService,
    private _httpService: HttpDefaultService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    if (localStorage.getItem('user'))
      this.appService.user = JSON.parse(localStorage.getItem('user'))

    this.egoForm = new FormGroup({
      'prenom': new FormControl('', [
        Validators.required,
        Validators.maxLength(16),
      ]),
      'nom': new FormControl('', [
        Validators.required,
        Validators.maxLength(16),
      ]),
    })
  }

  generate() {

    this.appService.user.uuid = uuid.v4()

    const letter1 = this.prenom.toLocaleUpperCase().charAt(0)
    const letter2 = this.nom.toLocaleUpperCase().charAt(0)

    //localStorage.setItem('user', JSON.stringify(this.appService.user))
    //this._router.navigate(['/main'])

    var camera, scene, renderer
    var geometry, material, mesh

    init()
    animate()

    function init() {

      camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10)
      camera.position.z = 0.5

      scene = new THREE.Scene()

      geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
      material = new THREE.MeshNormalMaterial()

      mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      document.body.appendChild(renderer.domElement)

    }

    function animate() {

      requestAnimationFrame(animate)

      mesh.rotation.x += 0.0
      mesh.rotation.y += 0.02

      renderer.render(scene, camera)

    }

    window.scrollTo(0, document.body.scrollHeight)
  }

}