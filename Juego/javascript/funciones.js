const tesoro = [];
const guerrero = {clase:"guerrero",inventario:["espada","casco","armadura"],vida:350,ataque:55}
const tanque = {clase:"tanque",inventario:["mazo","casco","armadura"],vida:800,ataque:20}
const usuario = {nombre:"Usuario",ubicacion: [0,0]};
const pirata = {nombre:"Jack Sparrow",vida:500,ataque:30}
let distanciaX = 0;
let distanciaY = 0;
let inputUsuario = true 

export {mostrarMenuPrincipal,reiniciarEstadisticas,elegirPersonaje,iniciarJuego,generarMapa,caminar,darPasosSuman,darPasosRestan,mostrarMenu2,cavar,explorarMapa,irNorte,irSur,irEste,irOeste};

mostrarMenuPrincipal()
//0. Reiniciar estadisticas---------------------------------------------------------------------------------------------------------------------
function reiniciarEstadisticas(){
    pirata.vida = 500;
    guerrero.vida = 350;
    tanque.vida = 800;
}

//1. Mostrar el menú principal------------------------------------------------------------------------------------------------------------------
function mostrarMenuPrincipal(){
    reiniciarEstadisticas()
    console.log("------------------------------------------------------------------")
    let opcionIniciar = prompt(`Bienvenido ${usuario.nombre} a la búsqueda del tesoro. Usted podrá:\n\n1. Jugar\n2. Ayuda\n3. Salir\n\nSeleccione la opción: `)
    while (inputUsuario == true){
        switch(opcionIniciar){
            case "1":
                console.log("-------------------------------------")
                usuario.nombre  = prompt('Ingrese su nombre de usuario: ');
                elegirPersonaje()
                iniciarJuego()
                break;
            case "2":
                console.log("-------------------------------------")
                console.log('¡Bienvenido al menú de ayuda!\nEn Pirates on Oak Island el usuario debe tratar de encontrar un tesoro escondido hace cientos de años. Para ello deberá enfrentarse a determinados desafíos y deberá estar muy atento sobre las decisiones que deba tomar.')
                console.log('Las respuestas negativas se brindan en color %c“rojo”',"color:rgb(224,0,0)");
                console.log('Las respuestas positivas en color %c“verde”.',"color:rgb(189, 255, 174)");
                console.log('Las acciones en color %c“rosa”',"color:rgb(238,187,187)");
                let jugar = prompt("¿Desea regresar al menú principal?(si/no): ")
                switch(jugar.toUpperCase()){
                    case "SI":
                    default:
                        mostrarMenuPrincipal();
                        break;
                    case "NO":
                        inputUsuario = false;
                        break;
                }
                break;
            case "3":
                inputUsuario = false;
                break;
            default:
                console.log("%cIntente de nuevo","color:rgb(224,0,0)")
                mostrarMenuPrincipal();
                break;
        }
    }
}

//1.1 Elegir el personaje--------------------------------------------------------------------------------------------------------------------
function elegirPersonaje(){
        console.log("\nLos personajes son los siguientes:")
        console.log("-------------------------------------")
        for (let p in guerrero){
            console.log(`${p}:%c${guerrero[p]}\n`,"color:rgb(127,0,178)")
        }
        console.log("-------------------------------------")
        for (let p in tanque){
            console.log(`${p}:%c${tanque[p]}\n`,"color:rgb(33, 150, 243)")
        }
        let seleccionPersonaje = prompt(`Digite la clase del personaje a seleccionar(guerrero/tanque): `)
        switch(seleccionPersonaje.toUpperCase()){
            case "GUERRERO":
                usuario.clase = guerrero.clase
                usuario.inventario = guerrero.inventario
                usuario.vida = guerrero.vida
                usuario.ataque = guerrero.ataque
                console.log(`%cEres un ${seleccionPersonaje}`,"color:rgb(238,187,187)")
                break;
            case "TANQUE":
                usuario.clase = tanque.clase
                usuario.inventario = tanque.inventario
                usuario.vida = tanque.vida
                usuario.ataque = tanque.ataque
                console.log(`%cEres un ${seleccionPersonaje}`,"color:rgb(238,187,187)")
                break;
            default:
                console.log("%cIntenta de nuevo","color:rgb(224, 0, 0)")
                elegirPersonaje()
                break;
        }
        
}

//1.2 Iniciar juego--------------------------------------------------------------------------------------------------------------------------
function iniciarJuego(){
    console.log("-----------------------------------------------------------------------------------------------------------------------------")
    console.log('Usted se encuentra en Canadá, específicamente en la Isla del Roble en búsqueda de un tesoro valuado en 100.000 euros.\nNadie está seguro sobre la historia, pero durante dos siglos congregó a varios investigadores y buscadores de tesoros,\naunque hasta el momento, ninguno logró encontrarlo. En este momento, usted cuenta con un mapa y una serie de pistas que\nproveen la información necesaria para hallarlo… o quizás tal vez no.')
    console.log("-----------------------------------------------------------------------------------------------------------------------------")
    generarMapa()
    caminar()
    mostrarMenu2()
}

//1.2.1 Genera el mapa--------------------------------------------------------------------------------------------------------------------------
function generarMapa(){
    let xTesoro = Math.floor(Math.random()*1000)+1
    let yTesoro = Math.floor(Math.random()*1000)+1
    tesoro.push(xTesoro,yTesoro)
    let xUsuario = Math.floor(Math.random()*1000)+1
    let yUsuario = Math.floor(Math.random()*1000)+1
    usuario.ubicacion[0] = xUsuario
    usuario.ubicacion[1] = yUsuario
}

//1.2.2 Caminar a coordenadas-------------------------------------------------------------------------------------------------------------------
function caminar(){
    while(true){
        console.log(`${usuario.nombre} se encuentra en (${usuario.ubicacion}) y el tesoro se encuentra en (${tesoro[0]},${tesoro[1]})`)
        if (usuario.ubicacion[0] > tesoro[0]){
            let pasosIzq = Number(prompt("\n¿Cuántos metros quieres caminar hacia la izquierda? ")) ;
            if(isNaN(pasosIzq)){
                console.log("%cIntenta de nuevo","color:rgb( 224, 0, 0)")
            }
            else{
                usuario.ubicacion[0] -= pasosIzq;
                darPasosRestan(0,"X")
            }
        }
        else if (usuario.ubicacion[0] < tesoro[0]){
            let pasosDer = Number(prompt("\n¿Cuántos metros quieres caminar hacia la derecha? "))
            if(isNaN(pasosDer)){
                console.log("%cIntenta de nuevo","color:rgb( 224, 0, 0)")
            }
            else{
                usuario.ubicacion[0] += pasosDer;
                darPasosSuman(0,"X")
            }
            
        }

        if (usuario.ubicacion[1] > tesoro[1]){
            let pasosAba = Number(prompt("¿Cuántos metros quieres caminar hacia abajo?"))
            if(isNaN(pasosAba)){
                console.log("%cIntenta de nuevo\n","color:rgb( 224, 0, 0)")
            }
            else{
                usuario.ubicacion[1] -= pasosAba;
                darPasosRestan(1,"Y")
            }
            
        }
        else if (usuario.ubicacion[1] < tesoro[1]){
            let pasosArr = Number(prompt("¿Cuántos metros quieres caminar hacia arriba?") )
            if(isNaN(pasosArr)){
                console.log("%cIntenta de nuevo\n","color:rgb( 224, 0, 0)")
            }
            else{
                usuario.ubicacion[1] += pasosArr;
                darPasosSuman(1,"Y")
            }
            
        }
        
        if(usuario.ubicacion[1] == tesoro[1] && usuario.ubicacion[0] == tesoro[0]){
            console.log("-------------------------------------")
            console.log("%c¡Estas en la ubicación indicada por el mapa!","color:rgb(189, 255, 174)")
            break;
        }
    }
}

//1.2.2.1 Dar pasos positivos-------------------------------------------------------------------------------------------------------------------
function darPasosSuman(numero,coordenada){
    if (usuario.ubicacion[numero] > tesoro[numero]){
        console.log("%c¡Te has pasado!\n","color:rgb(254,0,0)")
    }
    else if (usuario.ubicacion[numero] < tesoro[numero]){
        console.log("%c¡Aún te falta por llegar!\n","color:rgb(254,0,0)")
    }
    else if(usuario.ubicacion[numero] == tesoro[numero]){
        console.log("%c¡Llegaste a la coordenada " + coordenada + "!\n","color:rgb(189, 255, 174)")
    }
    else{
        console.log("%cIntente de nuevo\n","color:rgb(254,0,0)")
    }
}

//1.2.2.2 Dar pasos negativos-------------------------------------------------------------------------------------------------------------------
function darPasosRestan(numero,coordenada){
    if (usuario.ubicacion[numero] < tesoro[numero]){
        console.log("%c¡Te has pasado!\n","color:rgb(254,0,0)")
    }
    else if (usuario.ubicacion[numero] > tesoro[numero]){
        console.log("%c¡Aún te falta por llegar!\n","color:rgb(254,0,0)")
    }
    else if(usuario.ubicacion[numero] == tesoro[numero]){
        console.log("%c¡Llegaste a la coordenada " + coordenada + "!\n","color:rgb(189, 255, 174)")
    }
    else{
        console.log("%cIntente de nuevo\n","color:rgb(254,0,0)")
    }
}

//1.2.3 Mostrar Menu 2--------------------------------------------------------------------------------------------------------------------------
function mostrarMenu2(){
    console.log("-------------------------------------")
    console.log("En este punto no hay ninguna señal clara de lo que debes hacer, así que \ndeberás seguir tu instinto de caza-recompensas. Usted puede:\n\n1)Cavar un pozo en búsqueda del tesoro\n2)Caminar en los alrededores de la ubicación en busca de nuevas pistas.\n\nPista: Ten cuidado con la opción que elijas")
    let opcionBuscar = Number(prompt("\nDigite la opción en la que desea buscar el tesoro: "))
    console.log("-------------------------------------")
    if(isNaN(opcionBuscar) || (opcionBuscar <= 0 || opcionBuscar > 2)){
        console.log("%cIntenta de nuevo, debe ser un numero entre 1 y 2","color:rgb(254,0,0)")
        mostrarMenu2()
    }
    else{
        switch(opcionBuscar){
            case 1:
                cavar()
                break;
            case 2:
                explorarMapa()
                break;
        }
    }
}

//1.2.3.1 Cavar---------------------------------------------------------------------------------------------------------------------------------
function cavar(){
    let metros = 0;
    while(inputUsuario == true){
        let metrosCavar = Number(prompt("¿Cuántos metros desea cavar?: "))
        if(isNaN(metrosCavar) || (metrosCavar % 1 != 0) || metrosCavar <= 0){
            console.log("%cIntenta de nuevo, debe ser un numero entero positivo","color:rgb(254,0,0)")
        }
        else{
                metros += metrosCavar;
                if(metros <= 20){
                    console.log(`%c${usuario.nombre} está cavando...`,"color:rgb(238,187,187)")
                    let seguirCavando = prompt(`Llevas cavando ${metros}m. ¿Deseas seguir cavando?:(si/no) `)
                    console.log(seguirCavando)
                    switch(seguirCavando.toUpperCase()){
                        case "SI":
                            break;
                        case "NO":
                            console.log(`%c${usuario.nombre} está saliendo del hoyo...`,"color:rgb(238,187,187)")
                            console.log("%cSeguir cavando parecía peligroso...","color:rgb(189, 255, 174)")
                            explorarMapa()
                            break;
                        default:
                            console.log("%cIntente de nuevo","color:rgb(254,0,0)")
                            break;
                    }
                }
                else{
                    console.log(`%c\nEl pozo comienza a inundarse y ${usuario.nombre} se ha ahogado`,"color:rgb(254,0,0)")
                    inputUsuario = false
                    break;
                }
            }
        }
}

//1.2.3.2 Explorar Mapa-------------------------------------------------------------------------------------------------------------------------
function explorarMapa(){
    while(inputUsuario == true){
        console.log("-------------------------------------")
        console.log("Ahora está explorando el mapa.\nUsted puede caminar al Norte(n), Sur(s), Este(e), Oeste(o). ¿Hacia dónde desea dirigirse para encontrar nuevas pistas? \n\nPista: Tenga en cuenta que puede encontrarse con diferentes dificultades.")
        let direccionExplorar = prompt("Digite la opción:(n/s/e/o) ")
        switch(direccionExplorar.toUpperCase()){
            case "N":
                irNorte();
                break;

            case "S":
                irSur()
                break; 
            case "E":
                irEste();    
                break;
            case "O":
                irOeste();
                break;
            default:
                console.log('%cIntente de nuevo',"color:rgb(224,0,0)")
                explorarMapa();
                break;
        }
    }
}

//1.2.3.2.1 Ir al Norte-------------------------------------------------------------------------------------------------------------------------
function irNorte() {
    let i = 1;
    console.log("------------------------------------------------------------------")
    console.log(`¡¡Te has encontrado a un Pirata, su nombre es ${pirata.nombre} y comienza el duelo!!` )
    console.log("------------------------------------------------------------------")
    tag:
        while ((usuario.vida > 0 && pirata.vida > 0)) {
            console.log("Turno " + i+":");
            usuario.vida -= pirata.ataque;
            pirata.vida -= usuario.ataque;
            console.log(`%c${usuario.nombre} tiene una vida de ${usuario.vida}`,"color:rgb(189,255,174)");
            console.log(`%c${pirata.nombre} tiene una vida de ${pirata.vida}`,"color:rgb(224,0,0)");
            console.log("------------------------------------------------------------------")
            i++;
            if (pirata.vida <= usuario.ataque && pirata.vida > 0) {
                let continuarPeleando = prompt(`Llegaste al round final. Tienes ${usuario.vida} de vida\n¿Deseas continuar peleando?(si/no):`);
                switch (continuarPeleando.toUpperCase()) {
                    case "SI":
                    pirata.vida -= usuario.ataque;
                    console.log("------------------------------------------------------------------")
                    console.log(`%c¡HAS GANADO EL DUELO!\n${pirata.nombre.toUpperCase()} TENIA EL TESORO. %c¡LO HAS ENCONTRADO!`,"color:rgb(189,255,174)","color:yellow");
                    inputUsuario = false
                    break;
                
                    case "NO":
                    console.log("------------------------------------------------------------------")
                    console.log("%cTe rendiste y el pirata ha robado todas tus pertenencias. El juego ha terminado.","color:rgb(224,0,0)");
                    inputUsuario = false;
                    break tag;

                    default:
                        console.log('%cIntenta de nuevo',"color:rgb(224,0,0)")
                        break;
                }
            }
        }
}

//1.2.3.2.2 Ir al Oeste-------------------------------------------------------------------------------------------------------------------------
function irOeste(){
    console.log("----------------------------------------------------------------------------------------------------------------------")
    let acercarse = prompt("Caminaste 50 metros al oeste y observas una especie de escritura en un muro.\n¿Deseas acercarte?:(si/no) ")
    switch(acercarse.toUpperCase()){
        case "SI":
            console.log(`%c\nCaíste en un pozo. ${usuario.nombre} ha muerto`,"color:rgb(224,0,0)")
            inputUsuario = false;
            break;
        case "NO":
            console.log(`\n%cparecía una trampa…`,"color:rgb(189,255,174)")
            explorarMapa();
            break;
    }
}

//1.2.3.2.3 Ir al Este--------------------------------------------------------------------------------------------------------------------------
function irEste(){
    console.log("----------------------------------------------------------------------------------------------------------------------")
    console.log(`Usted ha caminado 60 metros al este, hasta encontrarse con una pequeña compuerta en el piso.`)
    let entrar = prompt(`¿Desea entrar?(si/no): `)
    switch(entrar.toUpperCase()){
        case "SI":
            console.log(`\n%cOh no, la compuerta se ha cerrado y te has quedado encerrado`,"color:rgb(224,0,0)")
            for(let i = 1; i <= 5; i++){
                console.log(`Día${i}: %cNadie te ha rescatado`,"color:rgb(224,0,0)")
                console.log("-----------------------------------------------------------------------------")
            }
            console.log(`%c${usuario.nombre} se ha quedado 5 días encerrado y ha muerto`,"color:rgb(224,0,0)")
            inputUsuario = false
            break;
        case "NO":
            console.log("%c\nQuizá fue la mejor decisión","color:rgb(189,255,174)")
            explorarMapa()
            break;
    }
}

//1.2.3.2.4 Ir al Sur---------------------------------------------------------------------------------------------------------------------------
function irSur(){
    console.log("----------------------------------------------------------------------------------------------------------------------")
    console.log("Usted lleva caminando un largo tiempo hacia el sur... hasta que en un momento, a unos 20 metros, logra observar varias\nlápidas con escritos y el escenario se ve un poco aterrador.")
    let acercamiento = prompt("\n¿Desea acercarse (si/no)?")
    if (acercamiento.toUpperCase() == "SI"){ 
        console.log(`\n%cHa pisado una mina. ${usuario.nombre} ha muerto`,"color:rgb(224,0,0)")
        inputUsuario = false;
    }
    else{
        console.log("%c\nSe veía bastante peligroso, creo que fue la decisión correcta no seguir.","color:rgb(189,255,174)")
    }
}