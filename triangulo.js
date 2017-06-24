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
    if(!a || !b || !c)
    {
        $("#lblResultado").text("debe ingresar todos los campos!").addClass("error");
        return;
    }
    if(parseInt(a)< 0 || parseInt(b) < 0 || parseInt(c) < 0)
    {
        $("#lblResultado").text("No se permiten lados negativos").addClass("error");
    
        return ;
    }
    
    $("#lblResultado").removeClass("error");
    
    if(a == b && b == c)
    {
        $("#lblResultado").text("Es equilatero!");
    }
    
    if(a != b && b != c && a  != c)
    {
        $("#lblResultado").text("Es Escaleno!");
    }
    
    if((a == b && a != c) || (a == c && a != b) || (b == c && b != a))
    {
        $("#lblResultado").text("Es Isoceles!");
    }
}

