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

import OrbitControls from 'orbit-controls-es6';

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
    { code: "A", imgSrc: null },
    { code: "B", imgSrc: null },
    { code: "C", imgSrc: null },
    { code: "D", imgSrc: null },
    { code: "E", imgSrc: null },
    { code: "F", imgSrc: null },
    { code: "G", imgSrc: null },
    { code: "H", imgSrc: null },
    { code: "IJ", imgSrc: null },
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
    { code: "U", imgSrc: null },
    { code: "V", imgSrc: null },
    { code: "W", imgSrc: null },
    { code: "X", imgSrc: null },
    { code: "Y", imgSrc: null },
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

    this._dialog.open(EgoDialogComponent, {
      data: {
      }
    })

    let camera, scene, renderer, controls
    let geometry, material, mesh

    const init = () => {

      scene = new THREE.Scene()
      renderer = new THREE.WebGLRenderer({ antialias: true })
      camera = new THREE.PerspectiveCamera(70, window.innerWidth / (window.innerHeight * 0.65), 0.01, 10)
      camera.rotation.x = 45 * Math.PI / 180;
      camera.rotation.y = 45 * Math.PI / 180;
      camera.rotation.z = 45 * Math.PI / 180;
      geometry = new THREE.CubeGeometry(0.2, 0.2, 0.2)
      controls = new OrbitControls(camera)

      camera.position.z = 0.3
      scene.background = new THREE.Color(0x2e2e2e)


      let meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20, 10, 10),
        new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: false })
      );
      meshFloor.rotation.x -= Math.PI / 2;
      meshFloor.receiveShadow = true;
      meshFloor.position.set(0, -0.3, 0);
      scene.add(meshFloor);

      let textureLoader = new THREE.TextureLoader();
      const materials = [
        new THREE.MeshPhongMaterial({
          color: 0xffffff,
          map: textureLoader.load("/assets/ego/letters/A1.jpg"),
          bumpMap: textureLoader.load("/assets/ego/crate0/crate0_bump.png"),
          normalMap: textureLoader.load("/assets/ego/crate0/crate0_normal.png")
        }),
        new THREE.MeshPhongMaterial({
          color: 0xffffff,
          map: textureLoader.load("/assets/ego/letters/A3.jpg"),
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
          map: textureLoader.load("/assets/ego/letters/A2.jpg"),
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



      let crate = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.2, 0.2),
        materials
      );
      crate.receiveShadow = true;
      crate.castShadow = true;
      scene.add(crate);

      let ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      scene.add(ambientLight);

      let light = new THREE.PointLight(0xffffff, 0.8, 18);
      light.position.set(4, 4, 4);
      light.castShadow = true;
      light.shadow.camera.near = 0.1;
      light.shadow.camera.far = 25;
      scene.add(light);

      let light2 = new THREE.PointLight(0xffffff, 0.8, 18);
      light2.position.set(3, -6, 3);
      light2.castShadow = true;
      light2.shadow.camera.near = 0.1;
      light2.shadow.camera.far = 25;
      scene.add(light2);

      renderer.setSize(window.innerWidth, window.innerHeight * 0.65)

      controls.update()
      document.getElementById('canvas').appendChild(renderer.domElement)
    }

    const animate = () => {

      requestAnimationFrame(animate)
      controls.update()

      //mesh.rotation.x += 0.0
      //mesh.rotation.y += 0.01

      renderer.render(scene, camera)

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

    const letter1 = this.prenom.toLocaleUpperCase().charAt(0)
    const letter2 = this.nom.toLocaleUpperCase().charAt(0)

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
    return '/assets/ego/letters/' + letter.code + Math.floor(Math.random() * Math.floor(4) + 1) + '.jpg'
  }
}