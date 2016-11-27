/**
 * Created by ivan on 24/11/16.
 */
// hace que el codigo es ejecutado solamente despues que la pagina termina de cargarse y protege toda varible contenida dentro del script para prevenir que no se hagan variables globales
//$(function() {
    // indica el modo en que el navegador debe ejecutar el código JavaScript
    // El modo estricto elimina algunos errores silenciosos de JavaScript haciendo que lancen excepciones, corrige errores que hacen que sea difícil para los motores de JavaScript realizar optimizaciones y  prohibe cierta sintaxis que es probable que sea definida en futuras versiones de ECMAScript.
    //"use strict";

    function StartFb() {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyC47tLIfXbbwiQbSFjgglwKgyvbfUDTM2Y",
            authDomain: "product-catalog-fd479.firebaseapp.com",
            databaseURL: "https://product-catalog-fd479.firebaseio.com",
            storageBucket: "product-catalog-fd479.appspot.com",
            messagingSenderId: "175992378112"
        };
        firebase.initializeApp(config);
    }

    StartFb();

    const auth = firebase.auth();

    function logOff() {
        auth.signOut().then(function() {
            console.log('Usuario deslogueado!');
            //unsetAppCookie;
            location.assign('index.html');
        }, function(error) {
            // An error happened.
            console.log('Error al salir', error);
        });
    }

    function editProduct(id) {
        window.name = id;
        location.assign('editproduct.html');
        return false;
    }

    function onComplete(error) {
        if(error) {
            alert('Eliminacion Fallo!');
        } else {
            alert('Se Elimino Correctamente!');
            //location.reload(true);
        }
    }

    function deleteProduct(id) {
        if (confirm('Estas seguro de eliminar la publicacion?') == true) {
            prodRef.child(id).remove(onComplete);
        }
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
            location.assign('login.html');
        }
    });



    var db = firebase.database();
    var prodData = {};

    var prodRef = db.ref('products');
    
    prodRef.on('value', function (snap) {
        prodData = snap.val();
        var listProducts = document.getElementById('product-list');

        if (listProducts != null) {
            var prodPreview  = '';

            $.each(prodData, function (index, value) {

                prodPreview += '<div class="col-md-3 col-sm-6 col-xs-12 product">';

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

                prodPreview += '<p><a href="#" class="btn btn-warning" role="button" onclick="editProduct(\'' + index + '\')">Edit</a>';
                prodPreview += ' <a href="#" class="btn btn-danger" role="button" onclick="deleteProduct(\'' + index + '\')">Delete</a></p>';

                prodPreview += '</div>';
                prodPreview += '</div>';

                prodPreview += '<div class="row spacer">';
                prodPreview += '</div>';

                prodPreview += '</div>';

            });

        }
        listProducts.innerHTML = prodPreview;

    }, function (errorObject) {

        console.log('Fallo la lectura de datos: ' + errorObject.code);
    });

//});

