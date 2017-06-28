const EQUILATERO = "Equilatero";
const ESCALENO = "Escaleno";
const ISOCELES = "Isósceles";

const VALOR_MAXIMO = 1000;

const MSJ_ERROR_DATOS_NO_CARGADOS = "Todos los lados del triangulo deben ser cargados";
const MSJ_ERROR_DATOS_NO_NUMERICOS = "Los datos ingresados no son numericos";
const MSJ_ERROR_DATOS_NEGATIVOS = "Los datos ingresados deben ser mayor a cero";
const MSJ_ERROR_DATOS_NO_FORMAN_TRIANGULO = "La suma de las longitudes de dos lados cualquiera debe ser  mayor a la longitud del lado restante";
const MSJ_ERROR_MAXIMO_VALOR = "El valor maximo que puede tener un cateto es de: 1000";

$(document).ready(function() {
    $("#btnResultado").click(function() {

        limpiarMensajes();

        var triangulo = {
            ladoA: $("#txtLadoA").val(),
            ladoB: $("#txtLadoB").val(),
            ladoC: $("#txtLadoC").val()
        };

        if (esTrianguloValido(triangulo)) {

            var tipoTriangulo = evaluarTipoTriangulo(triangulo);

            if (tipoTriangulo == ISOCELES) {
                mostrarMensajeInfo("El triangulo es Isósceles");
            }

            if (tipoTriangulo == ESCALENO) {
                mostrarMensajeInfo("El trinagulo es Escaleno");
            }

            if (tipoTriangulo == EQUILATERO) {
                mostrarMensajeInfo("El trinagulo es Equilatero");
            }
        }

        return false;
    });

    QUnit.test("Test de Cumple con tipo Triangulo", function(assert) {
        assert.equal(evaluarTipoTriangulo({
            ladoA: 1,
            ladoB: 1,
            ladoC: 1
        }), EQUILATERO, "Triangulo es Equilatero");
        assert.equal(evaluarTipoTriangulo({
            ladoA: 2,
            ladoB: 1,
            ladoC: 2
        }), ISOCELES, "Triangulo es Isósceles");
        assert.equal(evaluarTipoTriangulo({
            ladoA: 7,
            ladoB: 5,
            ladoC: 8
        }), ESCALENO, "Triangulo es Escaleno");
    });

    QUnit.test("Exepciones", function(assert) {

        //Este falla a proposito
        assert.throws(function() {

                var resultado = {};

                resultado = validarLadosNoVacios(null);

                if (!resultado.esValido) {
                    throw resultado.mensajeError;
                }
            },
            MSJ_ERROR_DATOS_NO_CARGADOS,
            "Tira excepción por datos no cargados");

        assert.throws(function() {

                var resultado = {};

                resultado = validarLadosNoVacios({
                    ladoA: "",
                    ladoB: "",
                    ladoC: ""
                });

                if (!resultado.esValido) {
                    throw resultado.mensajeError;
                }
            },
            MSJ_ERROR_DATOS_NO_CARGADOS,
            "Tira excepción por datos no cargados");

        assert.throws(function() {
                var resultado = validarSoloNumeros({
                    ladoA: 1,
                    ladoB: "a",
                    ladoC: 3
                });

                if (!resultado.esValido) {
                    throw resultado.mensajeError;
                }
            },
            MSJ_ERROR_DATOS_NO_NUMERICOS,
            "Tira excepción por datos no numericos"
        );

        assert.throws(function() {
                var resultado = validarLongitudesPositivas({
                    ladoA: 1,
                    ladoB: -4,
                    ladoC: -2
                });

                if (!resultado.esValido) {
                    throw resultado.mensajeError;
                }
            },
            MSJ_ERROR_DATOS_NEGATIVOS,
            "Tira excepción por datos negativos"
        );

        assert.throws(function() {
                var resultado = validarDesigualdadTriangular({
                    ladoA: 2,
                    ladoB: 2,
                    ladoC: 5
                });

                if (!resultado.esValido) {
                    throw resultado.mensajeError;
                }
            },
            MSJ_ERROR_DATOS_NO_FORMAN_TRIANGULO,
            "Tira excepción por no ser triangulo"
        );

        assert.throws(function() {
                var resultado = validarValorMaximoCateto({
                    ladoA: 10000000000000,
                    ladoB: 2,
                    ladoC: 5
                });

                if (!resultado.esValido) {
                    throw resultado.mensajeError;
                }
            },
            MSJ_ERROR_MAXIMO_VALOR,
            "Tira excepción por superar valor máximo permitido"
        );

    });

});

function evaluarTipoTriangulo(triangulo) {

    if (esEquilatero(triangulo)) {
        return EQUILATERO;
    }

    if (esIsoceles(triangulo)) {
        return ISOCELES;
    }

    if (esEscaleno(triangulo)) {
        return ESCALENO;
    }
}

function esEquilatero(triangulo) {
    return (triangulo.ladoA == triangulo.ladoB && triangulo.ladoB == triangulo.ladoC);
}

function esEscaleno(triangulo) {
    return (triangulo.ladoA != triangulo.ladoB && triangulo.ladoB != triangulo.ladoC && triangulo.ladoA != triangulo.ladoC)
}

function esIsoceles(triangulo) {
    return ((triangulo.ladoA == triangulo.ladoB && triangulo.ladoA != triangulo.ladoC) || (triangulo.ladoA == triangulo.ladoC && triangulo.ladoA != triangulo.ladoB) || (triangulo.ladoB == triangulo.ladoC && triangulo.ladoB != triangulo.ladoA))
}


//VALIDACIONES - INICIO

//1
function validarLongitudesPositivas(triangulo) {
    return {
        esValido: parseInt(triangulo.ladoA) >= 0 && parseInt(triangulo.ladoB) >= 0 && parseInt(triangulo.ladoC) >= 0,
        mensajeError: MSJ_ERROR_DATOS_NEGATIVOS
    };
}

//2
function validarLadosNoVacios(triangulo) {
    return {
        esValido: triangulo.ladoA.trim() != "" && triangulo.ladoB.trim() != "" && triangulo.ladoC.trim() != "",
        mensajeError: MSJ_ERROR_DATOS_NO_CARGADOS
    };
}

//3
function validarSoloNumeros(triangulo) {
    return {
        esValido: !isNaN(triangulo.ladoA) && !isNaN(triangulo.ladoB) && !isNaN(triangulo.ladoC),
        mensajeError: MSJ_ERROR_DATOS_NO_NUMERICOS
    };
}

//4
function validarDesigualdadTriangular(triangulo) {
    triangulo.ladoA = parseInt(triangulo.ladoA);
    triangulo.ladoB = parseInt(triangulo.ladoB);
    triangulo.ladoC = parseInt(triangulo.ladoC);

    return {
        esValido: (triangulo.ladoA + triangulo.ladoB > triangulo.ladoC) && (triangulo.ladoA + triangulo.ladoC > triangulo.ladoB) && (triangulo.ladoB + triangulo.ladoC > triangulo.ladoA),
        mensajeError: MSJ_ERROR_DATOS_NO_FORMAN_TRIANGULO
    };
}

//5
function validarValorMaximoCateto(triangulo) {
    triangulo.ladoA = parseInt(triangulo.ladoA);
    triangulo.ladoB = parseInt(triangulo.ladoB);
    triangulo.ladoC = parseInt(triangulo.ladoC);

    return {
        esValido: !(triangulo.ladoA > VALOR_MAXIMO || triangulo.ladoB > VALOR_MAXIMO || triangulo.ladoC > VALOR_MAXIMO),
        mensajeError: MSJ_ERROR_MAXIMO_VALOR
    };
}

//VALIDACIONES - FIN

function mostrarMensajeError(mensaje) {
    $("#lblResultado").text(mensaje).addClass("label label-danger");
    $("#lblResultado").show();
}

function mostrarMensajeInfo(mensaje) {
    $("#lblResultado").text(mensaje).addClass("label label-info");
    $("#lblResultado").show();
}

function limpiarMensajes() {
    $("#lblResultado").hide();
    $("#lblResultado").removeClass("label-danger");
    $("#lblResultado").removeClass("label-info");
}

function esTrianguloValido(triangulo) {

    var validaciones = [];
    var esValido = true;
    validaciones.push(validarLadosNoVacios);
    validaciones.push(validarSoloNumeros);
    validaciones.push(validarLongitudesPositivas);
    validaciones.push(validarValorMaximoCateto)
    validaciones.push(validarDesigualdadTriangular);

    $.each(validaciones, function(index, validacion) {
        var resultado = validacion(triangulo);
        if (!resultado.esValido) {
            mostrarMensajeError(resultado.mensajeError);
            esValido = false;
            return false;
        }
    });

    return esValido;
}
