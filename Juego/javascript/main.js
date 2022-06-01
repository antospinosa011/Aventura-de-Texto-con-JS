const tesoro = [];
const guerrero = {clase:"guerrero",inventario:["espada","casco","armadura"],vida:350,ataque:55}
const tanque = {clase:"tanque",inventario:["mazo","casco","armadura"],vida:800,ataque:20}
const usuario = {nombre:"Usuario",ubicacion: [0,0]};
const pirata = {nombre:"Jack Sparrow",vida:500,ataque:30}
let distanciaX = 0;
let distanciaY = 0;
let inputUsuario = true 

import {mostrarMenuPrincipal} from "./funciones.js"

mostrarMenuPrincipal()

