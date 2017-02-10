'use strict'

let finales

$.getJSON('finales.json', function(data) {

    finales = data.finales
    let i = 0

    for(let final of finales)
    {
        let botonMenu = $(`<li><a href='#' indice="${i}">${final.nombre}</a></li>`)

        $('#menu-finales').append(botonMenu)
        i++
    }

    $('#menu-finales').children().find('a').click(function() { mostrarPreguntas(Number($(this).attr('indice'))) })

    mostrarPreguntas(0)
})

function ponerPregunta(selector, pregunta, numero)
{
    $(selector).append(`
        <div class="row">
            <div class="col-md-1">
                <button type="button" name="button" class="btn btn-info" data-toggle="collapse" href="#${numero}"><i class="glyphicon glyphicon-info-sign"></i></button>
            </div>
            <div class="col-md-11">
                <p class="lead">${pregunta.pregunta}</p>
                <div class="collapse" id="${numero}">
                    <div class="alert alert-${pregunta.revision ? 'warning' : 'info'}" role="alert">
                    ${pregunta.revision ? '<span class="glyphicon glyphicon-exclamation-sign"></span><strong> En revisión</strong>: Esta pregunta podría no estar 100% correcta.' : ''}
                    <p><strong>Respuesta: </strong>${pregunta.respuesta}</p> ${pregunta.explicacion ? `<p><strong>Explicación: </strong>${pregunta.explicacion}</p>` : ''}</div>
                </div>
            </div>
        </div>`)
}

function ponerSeparador(selector, texto)
{
    $(selector).append(`
        <div class="row">
            <div class="col-md-12">
                <div class="alert alert-success">
                    <p>${texto}</p>
                </div>
            </div>
        </div>`)
}

function mostrarPreguntas(indice)
{
    $('#principal').html('')
    $('#menu-finales').children().removeClass('active')
    $('#menu-finales').find(`:nth-child(${indice + 1})`).first().toggleClass('active')

    let i = 0

    for (let pregunta of finales[indice].preguntas)
    {
        if(pregunta.esSeparador)
            ponerSeparador('#principal', pregunta.texto)
        else
            ponerPregunta('#principal', pregunta, i)
        i++
    }
}
