function ValidarNumero(event, Separador, decimales, sObj) {
    var charCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (Separador == ".") {
        if (charCode == 46) {
            if (sObj.value.indexOf(".") < 0)
                return true;
            else
                return false;
        }

        if (sObj.value.indexOf(".") > 0) {
            var txtlen = sObj.value.length;
            var dotpos = sObj.value.indexOf(".");
            if ((txtlen - dotpos) > decimales)
                return false;
        }
    }
    else
    {
        if (charCode == 44) {
            if (sObj.value.indexOf(",") < 0)
                return true;
            else
                return false;
        }

        if (sObj.value.indexOf(",") > 0) {
            var txtlen = sObj.value.length;
            var dotpos = sObj.value.indexOf(",");
            if ((txtlen - dotpos) > decimales)
                return false;
        }
    }

    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}


function FormatoNumero(decpoint, sep, sObj) {
    // check for missing parameters and use defaults if so
    var num = sObj.value;
    if (arguments.length == 2) {
        sep = ",";
    }
    if (arguments.length == 1) {
        sep = ",";
        decpoint = ".";
    }
    // need a string for operations
    num = num.toString();
    // separate the whole number and the fraction if possible
    a = num.split(decpoint);
    x = a[0]; // decimal
    y = a[1]; // fraction
    z = "";


    if (typeof (x) != "undefined") {
        // reverse the digits. regexp works from left to right.
        for (i = x.length - 1; i >= 0; i--)
            z += x.charAt(i);
        // add seperators. but undo the trailing one, if there
        z = z.replace(/(\d{3})/g, "$1" + sep);
        if (z.slice(-sep.length) == sep)
            z = z.slice(0, -sep.length);
        x = "";
        // reverse again to get back the number
        for (i = z.length - 1; i >= 0; i--)
            x += z.charAt(i);
        // add the fraction back in, if it was there
        if (typeof (y) != "undefined" && y.length > 0)
            x += decpoint + y;
    }
    sObj.value = x;
}

function MostrarMensaje(habilitarPostback, Tipo, Ancho, mostrarCerrar) {
    if (habilitarPostback == 0) {
        $("[id*=btnPostback]").hide();
    } else {
        $("[id*=btnPostback]").show();
    }

    var anchura = Ancho;
    $("#dialog").modal();
    $('#dialog').css('opacity', 1);
    $('#dialog').css('width', anchura);
    var Color;
    if (Tipo == 0)
        Color = '#ffffff';
    if (Tipo == 1)
        Color = '#f2dede';
    if (Tipo == 2)
        Color = '#d9edf7';
    if (Tipo == 3)
        Color = '#ccc';
    if (Tipo == 4)
        Color = '#dff0d8';

    $('#dialog').css('background-color', Color);
    var winW = $("#dialog").width();
    $('#dialog').css('margin-left', ((winW * -1) / 2) - 50);
    if (mostrarCerrar == '0') {
        $('#aCerrar').hide();
    }
    

}

function MostrarVistaPreviaDocumento(habilitarPostback, Tipo, Ancho) {
    if (habilitarPostback == 0) {
        $("[id*=btnPostback]").hide();
    } else {
        $("[id*=btnPostback]").show();
    }
    $('#dialog').on('show', function () {
        $(this).find('.modal-body').css({
           // width: '100%',
            height: '150',
            'max-height': '300'
        });
    });
    var anchura = Ancho;
    $("#dialog").modal();
    $('#dialog').css('opacity', 1);
    $('#dialog').css('width', anchura);
    var Color;
    if (Tipo == 0)
        Color = '#ffffff';
    if (Tipo == 1)
        Color = '#f2dede';
    if (Tipo == 2)
        Color = '#d9edf7';
    if (Tipo == 3)
        Color = '#ccc';
    if (Tipo == 4)
        Color = '#dff0d8';

    //$('#dialog').css('background-color', Color);
    var winW = $("#dialog").width();
    $('#dialog').css('margin-left', ((winW * -1) / 2) - 50);


}

//function Aceptar() {
//    $("#dialog").modal("hide");
//    $('#Contenedor_TituloModal').text('');
//    $('#Contenedor_Mensaje').text('');
//    $("[id*=Contenedor_Contenedor_AceptarBtn]").click();
//}


