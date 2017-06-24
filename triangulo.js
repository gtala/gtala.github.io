const EQUILATERO ="Equilatero";
const ESCALENO ="Escaleno" ;
const ISOCELES="Isoceles";




$(document).ready(function(){
    



QUnit.test("Test de Cumple con tipo Triangulo", function (assert) {

   
    assert.equal( EvaluarTriangulo(1,1,1),EQUILATERO,"Triangulo es Equilatero");
    assert.equal( EvaluarTriangulo(2,1,2),ISOCELES,"Triangulo es Isoceles");
    assert.equal( EvaluarTriangulo(2,1,3),ESCALENO,"Triangulo es Escaleno");
 
});




QUnit.test("Exepciones", function (assert) {

  assert.throws(
    function() {throw EvaluarTriangulo(1,"a",3);},
    "Los datos ingresados no son numericos",
    "Tira exepcion por datos no numericos"
  );
 

   assert.throws(
    function() {throw EvaluarTriangulo(20,5,5);},
    "No forma triangulo",
    "Tira exepcion por no formar triangulo"
  );






});





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
       throw "Los datos ingresados no son numericos";
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
        return EQUILATERO;
    }
    
    if(a != b && b != c && a  != c)
    {
        $("#lblResultado").text("El triangulo es Escaleno!");
        return ESCALENO;
    }
    
    if((a == b && a != c) || (a == c && a != b) || (b == c && b != a))
    {
        $("#lblResultado").text("El triangulo es Isoceles!");
        return ISOCELES;
    }
}



