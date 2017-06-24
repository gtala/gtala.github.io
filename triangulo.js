$(document).ready(function(){
    
 $("#btnResultado").click(
     function(){
         EvaluarTriangulo($("#txtLadoA").val(), $("#txtLadoB").val(), $("#txtLadoC").val());
         return false;
     }
     );
 
});

function EvaluarTriangulo(a,b,c)
{
    if(isNaN(a) || isNaN(b) || isNaN(c))
    {
        $("#lblResultado").text("Sólo se pueden ingresar números").addClass("label label-danger");
        return;
    }
    
    if(!a || !b || !c)
    {
        $("#lblResultado").text("Debe ingresar todos los campos!").addClass("label label-danger");
        return;
    }
    if(parseInt(a)< 0 || parseInt(b) < 0 || parseInt(c) < 0)
    {
        $("#lblResultado").text("No se permiten lados negativos").addClass("label label-danger");
    
        return ;
    }
    
    $("#lblResultado").removeClass("label label-danger");
    $("#lblResultado").addClass("label label-info");
    
    if(a == b && b == c)
    {
        $("#lblResultado").text("El triangulo es equilatero!");
    }
    
    if(a != b && b != c && a  != c)
    {
        $("#lblResultado").text("El triangulo es Escaleno!");
    }
    
    if((a == b && a != c) || (a == c && a != b) || (b == c && b != a))
    {
        $("#lblResultado").text("El triangulo es Isoceles!");
    }
}

