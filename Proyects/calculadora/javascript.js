// DEFINICIÓN DE VARIABLES
let dom_historial = document.getElementById("dom_historial");
let pantalla = document.getElementById("pantalla");
let historial = [];
let operando1 = "";
let operando2 = "";
let operador = "";

// DEFINICIÓN DE FUNCIONES

/**
 * Comprueba si se han establecido ambos operandos y el operador
 * Si se han establecido todos los operadores, se calcula el resultado,
 * en lo contrario, no haría nada
 */
const puedeOperar = () => operando1 != "" && operador != "" && operando2 != "" ? realizarOperacion() : console.log("Algo salió mal");

/**
 * Establece el operando u operador que esté indicando el usuario
 * También puede recibir una instrucción de operar como la raiz cuadrada
 * @param entrada es el dato o instrucción que recibe para establecer/operar
 */
function establecerOperandos(entrada) {
    // Si el operando1 es NaN o Infinity, lo reinicia
    if (operando1.toString() == "NaN" || operando1.toString().includes("Infinity")) operando1 = "";
    if (operando2.toString() == "NaN" || operando2.toString().includes("Infinity")) operando2 = "";
    // Establece el operador
    if (/[%÷x+-]/.test(entrada) && operando1 != "" && operando1 != "-") {
        if (operando2 != "") puedeOperar();
        if (entrada == "-" && operando1 != "" && operando2 == "" && operador == "-") operando2 = entrada;
        operador = entrada;
    }
    // Establece el operando 1
    if (/[0-9.\-\^]/.test(entrada) && operador == "" && operando2 == ""){
        if (operando1.length < 8 && !/[\.\-\^]/.test(entrada)) operando1 += entrada + "";
        if (operando1.length < 7 && entrada == "." && !/[.]/.test(operando1)) operando1 += entrada + "";
        if (operando1.length < 7 && entrada == "^" && operando1 != "" && operando1 != "." && !/[\^]/.test(operando1)) operando1 += entrada + "";
        if (operando1.length == 0 && entrada == "-") operando1 += entrada + "";
        if (operando1.length == undefined && entrada != "^") operando1 = entrada + "";
        if (operando1.length == undefined && entrada == "^" && operando1 != "." && !/[\^]/.test(operando1) && operando1.toString().length < 7) operando1 += entrada + "";
    }
    // Establece el operando2
    if (/[0-9.\^]/.test(entrada) && operador != "" && operador != ""){
        if (operando2.length < 8 && !/[\.\^]/.test(entrada)) operando2 += entrada + "";
        if (operando2.length < 7 && entrada == "." && !/[.]/.test(operando2)) operando2 += entrada + "";
        if (operando2.length < 7 && entrada == "^" && operando2 != "" && operando2 != "." && !/[\^]/.test(operando2)) operando2 += entrada + "";
        if (operando2.length == undefined && entrada != "^") operando2 = entrada + "";
    }
    // Borra los operandos
    if (entrada == "borrar"){
        if (operando1 != "" && operador == "" && operando2 == "") operando1 = pantalla.innerHTML.split(" ")[0].slice(0, -1);
        if (operando1 != "" && operador != "" && operando2 == "") operador = "";
        if (operando1 != "" && operador != "" && operando2 != "") operando2 = pantalla.innerHTML.split(" ")[2].slice(0, -1);
    }
    // Cambia el signo del operando correspondiente
    if (entrada == "cambiar"){
        if (operando1 != "" && operando1 != "-" && operando2 == "" && operador == "") operando1 = - parseFloat(operando1);
        if (operando1 != "" && operando2 != "-" && operando2 != "") operando2 = - parseFloat(operando2);
    }
    // Devuelve la inversa del operando correspondiente
    if (entrada == "inversa"){
        if (operando1 != "" && operando1 != "-" && operando2 == "" && operador == "") operando1 = 1 / parseFloat(operando1);
        if (operando1 != "" && operando2 != "-" && operando2 != "") operando2 = 1 / parseFloat(operando2);
    }
    // Devuelve la raiz cuadrada del operando correspondiente
    if (entrada == "raiz"){
        if (operando1 != "" && operando1 != "-" && operando2 == "" && operador == "") operando1 = Math.sqrt(parseFloat(operando1));
        if (operando1 != "" && operando2 != "-" && operando2 != "") operando2 = Math.sqrt(parseFloat(operando2));
    }
    // Devuelve el logaritmo natural del operando correspondiente
    if (entrada == "log_natu"){
        if (operando1 != "" && operando1 != "-" && operando2 == "" && operador == "") operando1 = Math.log10(parseFloat(operando1));
        if (operando1 != "" && operando2 != "-" && operando2 != "") operando2 = Math.log10(parseFloat(operando2));
    }
    // Devuelve el logaritmo neperiano del operando correspondiente
    if (entrada == "log_nepe"){
        if (operando1 != "" && operando1 != "-" && operando2 == "" && operador == "") operando1 = Math.log(parseFloat(operando1));
        if (operando1 != "" && operando2 != "-" && operando2 != "") operando2 = Math.log(parseFloat(operando2));
    }
    // Devuelve la constante e
    if (entrada == "const_e"){
        if (operando2 == "" && operador == "") operando1 = Math.E;
        if (operando1 != "" && operador != "") operando2 = Math.E;
    }
    // Devuelve la constante pi
    if (entrada == "const_pi"){
        if (operando2 == "" && operador == "") operando1 = Math.PI;
        if (operando1 != "" && operador != "") operando2 = Math.PI;
    }
    // Devuelve el factorial del operando correspondiente
    if (entrada == "factorial"){
        if (operando2 == "" && operador == "") operando1 = calc_factorial(operando1);
        if (operando1 != "" && operador != "") operando2 = calc_factorial(operando2);
    }
    // Devuelve la constante pi
    if (entrada == "rnd"){
        if (operando2 == "" && operador == "") operando1 = Math.random();
        if (operando1 != "" && operador != "") operando2 = Math.random();
    }
    // Devuelve el coseno del operando correspondiente
    if (entrada == "coseno"){
        if (operando2 == "" && operador == "") operando1 = Math.cos(operando1);
        if (operando1 != "" && operador != "") operando2 = Math.cos(operando2);
    }
    // Devuelve el seno del operando correspondiente
    if (entrada == "seno"){
        if (operando2 == "" && operador == "") operando1 = Math.sin(operando1);
        if (operando1 != "" && operador != "") operando2 = Math.sin(operando2);
    }
    // Devuelve el tangente del operando correspondiente
    if (entrada == "tangente"){
        if (operando2 == "" && operador == "") operando1 = Math.tan(operando1);
        if (operando1 != "" && operador != "") operando2 = Math.tan(operando2);
    }
    // Establece al operando correspondiente como 2^
    if (entrada == "pot_dos"){
        if (operando1 == "" && operador == "" && operando2 == "") operando1 = "2^";
        if (operando1 != "" && operador != "" && operando2 == "") operando2 = "2^";
    }
    // Establece al operando correspondiente % para calcular posteriormente
    // el porcentaje indicado
    if (entrada == "porcentaje"){
        if (operando1 != "" && operador != "" && operando2 != "" && operando2 != "." && !/[\^\%]/.test(operando2)) operando2 += "%";
    }
    // Almacena la memoria dependiento del operando que estés modicicando
    if (entrada == "memoria"){
        if (operando1 != "" && operando1 != "." && !/[\^\%]/.test(operando1) && operador == "" && operando2 == "" && dom_memoria.innerHTML == ""){
            establecerMemoria(operando1);
        }
        if (operando2 != "" && operando2 != "." && !/[\^\%]/.test(operando2) && operador != "" && operando1 != "" && dom_memoria.innerHTML == ""){
            establecerMemoria(operando2);
        }
        if (dom_memoria != "" && operador == "" && operando2 == "") operando1 = dom_memoria.innerHTML;
        if (dom_memoria != "" && operador != "" && operando1 != "") operando2 = dom_memoria.innerHTML;
    }

    // depurar();
    mostrarPorPantalla();
}

/**
 * Se usa para depurar el código y finalmente establecer por pantalla los 
 * datos que va indicando el usuario a la calculadora
 * Para ver el funcionamiento, decomenta todos las llamadas a ésta función
 */
// function depurar(){
//     document.getElementById("dom_operador1").innerHTML = "Operador1 => " + operando1;
//     document.getElementById("dom_operador2").innerHTML = "Operador2 => " + operando2;
//     document.getElementById("dom_operador").innerHTML = "Operando => " + operador;
// }

/**
 * Realiza una operación dependiendo del operando que se haya establecido
 * previamente y finalmente muestra el pantalla por pantalla
 */
function realizarOperacion(){
    if (operando1.toString().includes("^")) operando1 = Math.pow(operando1.split('^')[0], operando1.split('^')[1]);
    if (operando2.toString().includes("^")) operando2 = Math.pow(operando2.split('^')[0], operando2.split('^')[1]);
    if (operando2.toString().includes("%")){
        if (operador == "x") operando1 = (parseFloat(operando1) * parseFloat(operando2)) / 100;
        if (operador == "+") operando1 = parseFloat(operando1) + ((parseFloat(operando1) * parseFloat(operando2)) / 100);
        if (operador == "-") operando1 = parseFloat(operando1) - ((parseFloat(operando1) * parseFloat(operando2)) / 100);
    } else {
        if (operador == "÷") operando1 = parseFloat(operando1) / parseFloat(operando2);
        if (operador == "x") operando1 = parseFloat(operando1) * parseFloat(operando2);
        if (operador == "+") operando1 = parseFloat(operando1) + parseFloat(operando2);
        if (operador == "-") operando1 = parseFloat(operando1) - parseFloat(operando2);
        if (operador == "%") operando1 = parseFloat(operando1) % parseFloat(operando2);
    }
    
    operador = "";
    operando2 = "";
    // depurar();
    establecerHistorial();
    pantalla.innerHTML = arreglarNum(operando1);
}

/**
 * 
 * Calcula el factorial de un número
 */
function calc_factorial(x){
    if (Math.trunc(x).length >= 4) { return "Infinity"; };
    var fact = 1;
    for (var i = 2; i <= x; i++)
        fact = fact * i;
    return fact;
}

/**
 * Arregla los resultado de las operaciones como 0.1 + 0.2 = 0.30000000000000004
 * De esta forma, devolvería 0.1 + 0.2 = 0.3
 */
 function arreglarNum(numero){
    let num = numero;
    if ((num > Number.EPSILON) && /[.]/.test(num) && num.toString().split(".")[1].length > 8) {
        num = Math.trunc(num);
        if (numero.toString().split(".")[1].slice(0, 8).replace(/0*$/,'') != ""){
            num += "." + numero.toString().split(".")[1].slice(0, 8).replace(/0*$/,'');
        }
    }
    return num;
}

/**
 * Muestra los datos que está introduciendo el usuario en la pantalla de la calculadora.
 */
function mostrarPorPantalla(){
    pantalla.innerHTML = arreglarNum(operando1) + " " + operador + " " + arreglarNum(operando2);
    operando1 == "" ? limpiar.innerHTML = "CE" : limpiar.innerHTML = "C";
}

/**
 * Establece y actualiza el historial de las operaciones que se van realizando en la calculadora.
 */
function establecerHistorial(){
    dom_historial.innerHTML = "";
    historial.push({operacion: pantalla.innerHTML, pantalla: arreglarNum(operando1)});
    historial.map(operacion => {
        dom_historial.innerHTML += `<p">${operacion['operacion']} = ${operacion['pantalla']}</p>`
    });
}

/**
 * Limpia la pantalla o resetea la calculadora completamente
 */
function limpiarCalculadora() {
    if (limpiar.innerHTML == "C"){
        pantalla.innerHTML = "0";
        limpiar.innerHTML = "CE"
    } else {
        dom_memoria.innerHTML = "";
        memoria.classList.remove('bg-yellow-300');
        memoria.classList.add('bg-yellow-100');
        historial = [];
        dom_historial.innerHTML = "";
    }
    operando1 = "";
    operando2 = "";
    operador = "";

    // depurar();
}

/**
 * Cambia la calculadora simple por la científica y viceversa
 */
function mostrarCientifica(){
    let btns_cientifica = document.querySelectorAll('.cientifica');
    let caja = document.getElementById('botones');

    [...btns_cientifica].map(btn => {
        caja.classList.contains('grid-cols-4') ? btn.classList.remove('hidden') : btn.classList.add('hidden');
    });
    if (caja.classList.contains('grid-cols-4')) {
        document.getElementById('calculadora').classList.remove('w-[290px]');
        document.getElementById('calculadora').classList.add('w-[429px]');
        caja.classList.remove('grid-cols-4');
        caja.classList.add('grid-cols-6');
    } else {
        document.getElementById('calculadora').classList.remove('w-[429px]');
        document.getElementById('calculadora').classList.add('w-[290px]');
        caja.classList.remove('grid-cols-6');
        caja.classList.add('grid-cols-4');
    }
}

/**
 * 
 */
function establecerMemoria(operando){
    dom_memoria.innerHTML = operando;
    memoria.classList.remove('bg-yellow-100');
    memoria.classList.add('bg-yellow-300');
}

// DEFINICIÓN DE EVENT LISTENERS Y HANDLERS
cero.onclick = () => establecerOperandos(0);
uno.onclick = () => establecerOperandos(1);
dos.onclick = () => establecerOperandos(2);
tres.onclick = () => establecerOperandos(3);
cuatro.onclick = () => establecerOperandos(4);
cinco.onclick = () => establecerOperandos(5);
seis.onclick = () => establecerOperandos(6);
siete.onclick = () => establecerOperandos(7);
ocho.onclick = () => establecerOperandos(8);
nueve.onclick = () => establecerOperandos(9);
punto.onclick = () => establecerOperandos(".");

dividir.onclick = () => establecerOperandos("÷");
multiplicar.onclick = () => establecerOperandos("x");
sumar.onclick = () => establecerOperandos("+");
restar.onclick = () => establecerOperandos("-");

cambiar.onclick = () => establecerOperandos("cambiar");
inversa.onclick = () => establecerOperandos("inversa");
raiz.onclick = () => establecerOperandos("raiz");
porcentaje.onclick = () => establecerOperandos("porcentaje");

log_natu.onclick = () => establecerOperandos("log_natu");
log_nepe.onclick = () => establecerOperandos("log_nepe");
const_e.onclick = () => establecerOperandos("const_e");
const_pi.onclick = () => establecerOperandos("const_pi");
factorial.onclick = () => establecerOperandos("factorial");
mod.onclick = () => establecerOperandos("%");
rnd.onclick = () => establecerOperandos("rnd");
pot_dos.onclick = () => establecerOperandos("pot_dos");
pot_cualquier.onclick = () => establecerOperandos("^");

coseno.onclick = () => establecerOperandos("coseno");
seno.onclick = () => establecerOperandos("seno");
tangente.onclick = () => establecerOperandos("tangente");

limpiar.onclick = () => limpiarCalculadora();
borrar.onclick = () => establecerOperandos("borrar");
memoria.onclick = () => establecerOperandos("memoria");

darResultado.onclick = () => /[\^]/.test(operando1) && operador == "" ? realizarOperacion() : puedeOperar();
cientifica.onclick = () => mostrarCientifica();