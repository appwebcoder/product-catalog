/**
 * Created by ivan on 24/11/16.
 */
/**
 * Created by ivan on 24/11/16.
 */
/**
 * Created by ivan on 24/11/16.
 */
// hace que el codigo es ejecutado solamente despues que la pagina termina de cargarse y protege toda varible contenida dentro del script para prevenir que no se hagan variables globales
$(function() {
    // indica el modo en que el navegador debe ejecutar el código JavaScript
    // El modo estricto elimina algunos errores silenciosos de JavaScript haciendo que lancen excepciones, corrige errores que hacen que sea difícil para los motores de JavaScript realizar optimizaciones y  prohibe cierta sintaxis que es probable que sea definida en futuras versiones de ECMAScript.
    "use strict";

    const auth = firebase.auth();
    var db = firebase.database();
    var prodData = {};

    var prodRef = db.ref('products');

    prodRef.on('value', function (snap) {
        prodData = snap.val();
        var listProducts = document.getElementById('product-list');

        var prodPreview = '';

        $.each(prodData, function (index, value) {

            prodPreview += '<div class="col-md-3 col-sm-6 col-xs-12">';

            prodPreview += '<div class="thumbnail">';

            if (value.image == 'NONE') {
                prodPreview += '<img alt="No Pic">';
            } else {
                prodPreview += '<img src=' + value.image + '>';
            }

            prodPreview += '<div class="caption">';
            prodPreview += '<h3>' + value.name + '</h3>';
            prodPreview += '<h3>$' + value.price + '</h3>';
            prodPreview += '<p>' + value.description + '</p>';

            prodPreview += '</div>';
            prodPreview += '</div>';

            prodPreview += '<div class="row spacer">';
            prodPreview += '</div>';

            prodPreview += '</div>';

        });

        listProducts.innerHTML = prodPreview;

    }, function (errorObject) {
        console.log('La lectura fallo: ' + errorObject.code);
    });

    function logOff() {
        auth.signOut().then(function() {
            location.assign('index.html');
        }, function(error) {
            // An error happened.
            console.log('Error al salir', error);
        });
    }

    auth.onAuthStateChanged(function(user) {
        if (user) {
            var loggedIn = '<li><p class="navbar-text">' + user.email + '</p></li>';
            loggedIn += '<li><a href="#" id="logoutLink">Salir</a></li>';

            $(loggedIn).appendTo('.navbar-right');
            $('#logoutLink').click(logOff);
            console.log('Usuario logueado');
        } else {
            console.log('Usuario no logueado');
        }
    });

});

