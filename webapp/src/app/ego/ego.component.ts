import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { AppService } from '../app.service'
import { Priorite, Statut } from '../_types'
import { AppUtilsService, HttpDefaultService } from 'app/_utils'
import { Router } from '@angular/router'
import * as uuid from 'uuid'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/map'
import { EgoDialogComponent } from '../dialog/ego/ego.component'

import OrbitControls from 'orbit-controls-es6'

import * as THREE from 'three'
import MTLLoader from 'three-mtl-loader'
import OBJLoader from 'three-obj-loader'
import FBXLoader from 'three-fbx-loader'
OBJLoader(THREE)

@Component({
  selector: 'app-ego',
  templateUrl: './ego.component.html',
  styleUrls: ['./ego.component.scss'],
  providers: [
    AppUtilsService
  ]
})
export class EgoComponent implements OnInit {

  loaded = false
  showSigns = false

  users = [
    {
      nom: '',
      prenom: ''
    }
  ]

  scene

  letters = [
    { code: "A", imgSrc: null },
    { code: "B", imgSrc: null },
    { code: "C-G", imgSrc: null },
    { code: "D", imgSrc: null },
    { code: "E", imgSrc: null },
    { code: "F", imgSrc: null },
    { code: "H", imgSrc: null },
    { code: "I-J", imgSrc: null },
    { code: "K", imgSrc: null },
    { code: "L", imgSrc: null },
    { code: "M", imgSrc: null },
    { code: "N", imgSrc: null },
    { code: "O", imgSrc: null },
    { code: "P", imgSrc: null },
    { code: "Q", imgSrc: null },
    { code: "R", imgSrc: null },
    { code: "S", imgSrc: null },
    { code: "T", imgSrc: null },
    { code: "U-W", imgSrc: null },
    { code: "V-Y", imgSrc: null },
    { code: "X", imgSrc: null },
    { code: "Z", imgSrc: null }
  ]

  constructor(
    public appService: AppService,
    private _appUtilsService: AppUtilsService,
    private _httpService: HttpDefaultService,
    private _router: Router,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {

    /*this._dialog.open(EgoDialogComponent, {
      data: {
      }
    })*/

    let camera, scene, renderer, controls
    let geometry, material, mesh

    const init = () => {

      const canvasHeightPercent = 0.57

      scene = new THREE.Scene()
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      camera = new THREE.PerspectiveCamera(70, window.innerWidth / (window.innerHeight * canvasHeightPercent), 0.01, 10)
      geometry = new THREE.CubeGeometry(0.2, 0.2, 0.2)
      controls = new OrbitControls(camera)
      controls.minDistance = 2
      controls.maxDistance = 7

      camera.position.z = 2.5
      scene.background = new THREE.Color(0x2e2e2e)

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / (window.innerHeight * canvasHeightPercent)
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, (window.innerHeight * canvasHeightPercent))
      }, false)

      let meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 50, 50, 50),
        new THREE.MeshPhongMaterial({ color: 0x2e2e2e, wireframe: false })
      )
      meshFloor.rotation.x -= Math.PI / 2
      meshFloor.receiveShadow = true
      meshFloor.position.set(0, -0.75, 0)
      scene.add(meshFloor)

      var loader = new FBXLoader()
      loader.load('/assets/ego/fbx/ego.FBX', (object) => {

        var box = new THREE.Box3()
        box.setFromObject(object)
        var size = new THREE.Vector3()
        size.subVectors(box.max, box.min)
        var center = new THREE.Vector3()
        center.addVectors(box.max, box.min).multiplyScalar(0.5)

        var objSize = Math.max(size.x, size.y, size.z)
        var scaleSet = 2 / objSize

        var theObject = new THREE.Object3D()
        theObject.add(object)
        object.scale.set(scaleSet, scaleSet, scaleSet)
        object.position.set(-center.x * scaleSet, (-center.y * scaleSet + size.y / 2 * scaleSet) - 0.75, -center.z * scaleSet)
        scene.add(theObject)
        this.loaded = true
      })

      let ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
      scene.add(ambientLight)

      let light1 = new THREE.PointLight(0xe4e8fe, 0.3, 18)
      scene.add(light1)

      let light2 = new THREE.PointLight(0xe4e8fe, 0.8, 18)
      light2.position.set(3, -6, 3)
      light2.castShadow = true
      light2.shadow.camera.near = 0.1
      light2.shadow.camera.far = 25
      scene.add(light2)

      let light3 = new THREE.PointLight(0xe4e8fe, 0.8, 18)
      light3.position.set(-5, 8, -4)
      light3.castShadow = true
      light3.shadow.camera.near = 0.1
      light3.shadow.camera.far = 25
      scene.add(light3)

      renderer.setSize(window.innerWidth, window.innerHeight * canvasHeightPercent)

      controls.update()
      document.getElementById('canvas').appendChild(renderer.domElement)
    }

    const animate = () => {

      requestAnimationFrame(animate)
      controls.update()

      renderer.render(scene, camera)
      this.scene = scene
    }

    init()
    animate()
  }

  onAddUserClick() {
    this.users.push({ nom: '', prenom: '' })
  }

  onDeleteUserClick(user) {
    this.users.splice(this.users.indexOf(user), 1)
  }

  generate() {

    this.appService.user.uuid = uuid.v4()

    const letter1 = this.users[0].prenom.toLocaleUpperCase().charAt(0)
    const letter2 = this.users[0].nom.toLocaleUpperCase().charAt(0)

    this.scene.remove(this.scene.getObjectByName('cube'))
    this.scene.add(this.generateEgo())
  }

  onLetterClick(letter) {
    const index = this.letters.indexOf(letter)
    let newLetter = this.generateLetter(letter)
    while (this.letters[index].imgSrc === newLetter) {
      newLetter = this.generateLetter(letter)
    }
    this.letters[index].imgSrc = newLetter
  }

  onLetterMouseEnter(letter, event) {
    const index = this.letters.indexOf(letter)
    this.letters[index].imgSrc = this.generateLetter(letter)
  }

  onLetterMouseLeave(letter) {

    const index = this.letters.indexOf(letter)
    this.letters[index].imgSrc = null
  }

  private generateLetter(letter) {
    let src = '/assets/ego/letters/'
    src += letter.code + Math.floor(Math.random() * 3 + 1)
    if (Math.random() > 0.5)
      src += '_2'
    src += '.jpg'
    return src
  }

  private generateEgo() {
    const materials = this.getMaterials()
    const ego = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.2, 0.2),
      materials
    )
    ego.name = 'cube'
    ego.receiveShadow = true
    ego.castShadow = true
    ego.rotation.x = Math.PI / 4
    ego.rotation.y = Math.PI / 4

    return ego
  }

  private getMaterials() {
    let textureLoader = new THREE.TextureLoader()
    return [
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: textureLoader.load(this.generateLetter(this.letters[0])),
        bumpMap: textureLoader.load("/assets/ego/crate0/crate0_bump.png"),
        normalMap: textureLoader.load("/assets/ego/crate0/crate0_normal.png")
      }),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: textureLoader.load(this.generateLetter(this.letters[0])),
        bumpMap: textureLoader.load("/assets/ego/crate0/crate0_bump.png"),
        normalMap: textureLoader.load("/assets/ego/crate0/crate0_normal.png")
      }),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: textureLoader.load("/assets/ego/crate0/crate0_diffuse.png"),
        bumpMap: textureLoader.load("/assets/ego/crate0/crate0_bump.png"),
        normalMap: textureLoader.load("/assets/ego/crate0/crate0_normal.png")
      }),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: textureLoader.load("/assets/ego/crate0/crate0_diffuse.png"),
        bumpMap: textureLoader.load("/assets/ego/crate0/crate0_bump.png"),
        normalMap: textureLoader.load("/assets/ego/crate0/crate0_normal.png")
      }),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: textureLoader.load(this.generateLetter(this.letters[0])),
        bumpMap: textureLoader.load("/assets/ego/crate0/crate0_bump.png"),
        normalMap: textureLoader.load("/assets/ego/crate0/crate0_normal.png")
      }),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: textureLoader.load("/assets/ego/crate0/crate0_diffuse.png"),
        bumpMap: textureLoader.load("/assets/ego/crate0/crate0_bump.png"),
        normalMap: textureLoader.load("/assets/ego/crate0/crate0_normal.png")
      }),
    ]
  }
}