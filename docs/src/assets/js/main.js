const form = document.getElementById('formVisit'); // Obtenemos la referencia al formulario
const infoVisit = document.getElementById('infoVisit');

// NUEVO PARA LA CAMARA
let canvasImg = document.getElementById('canvas');
var dataBase64 = canvasImg.toDataURL();
console.log(dataBase64)
//


if (form) {
  // Si existe nuestro elemento en memoria este se quedara escuchando al evento submit del formulario
  form.addEventListener('submit', formVisit); // Al momento de enviar el formulario, ejecuta la función "contactform"
}

// Boton para enviar formulario de visita
infoVisit.addEventListener('click', event => {
  event.preventDefault(); // Prevenimos el comportamiento por defecto de un formulario (Enviar por URL los parametros)
  // Se crea la informacion del visitante, rut, nombre y apellido
  let rut = document.getElementById('rut');
  let nombre = document.getElementById('nombre');
  let apellido = document.getElementById('apellido');
  let receiverEmail = document.getElementById('user_email').value;
  console.info(user_email);

  // tabla

  // Se crea constructor para fecha
  let formatoFecha = new Date();
  let day = formatoFecha.getUTCDate();
  let month = formatoFecha.getMonth() + 1;
  let year = formatoFecha.getFullYear();
  var hour = formatoFecha.getHours();
  var min = formatoFecha.getMinutes();

  fecha = day + '/' + month + '/' + year;
  hora = hour + ':' + min;
  // Aqui se obtiene el valor del select
  let selectOptionsIf = document.getElementById('zonaIfOptions');
  selectOptionsIf.addEventListener('click', function() {
    let selectedZonaIf = this.options[selectOptionsIf.selectedIndex];
    console.log(selectedZonaIf.value);
  });

  const infoUsuarioIf = {
    recinto: selectOptionsIf.value,
    fecha: fecha,
    hora: hora,
    rut: rut.value,
    nombre: nombre.value,
    apellido: apellido.value,
    img: dataBase64 // aqui se agregaaaaa la camara en firebase
  }; // Creamos un objecto con todos los elementos de nuestro formulario.
  
  saveContactForm(infoUsuarioIf); // Enviamos la información obtenida por el usuario a la función que se encargará de guardar la información en Firebase
  form.reset(); // Borramos todos los campos.
  // Nos informa si la informacion fue guardada correctamente en firebase
  function saveContactForm(infoUsuarioIf) {
    firebase
      .database()
      .ref('zonaIf')
      .push(infoUsuarioIf) // Hacemos referencia el nombre del objeto que contendrá nuestros registros y empujamos los nuevos envios de datos
      .then(function() {
        //alert('Se ha enviado un aviso de su llegada'); // Si la petición es correcta y almaceno los datos mostramos un mensaje al usuario.
        console.info(Email);
      
        Email.send('la.laboratoria@example.com',
        receiverEmail,
        'Visitante',
        'Hola, tiene un nuevo visitante :' + infoUsuarioIf.nombre + ' ' + infoUsuarioIf.apellido,
        {token: 'f92c06af-db41-408f-87f2-b2190fa2bc84'
        }); 
         alert('Se ha enviado un aviso de su llegada'); // Si la petición es correcta y almaceno los datos mostramos un mensaje al usuario.
         alert('mensaje guardado'); // Si la petición es correcta y almaceno los datos mostramos un mensaje al usuario.
      })
        .catch(function () {
          alert('No fue posible guardar su selección'); // En caso de ocurrir un error le mostramos al usuario que ocurrió un error.
        });
  } 
            
  // aqui evaluamos la ruta y se imprime en HTML

  firebase
    .database()
    .ref('/zonaIf')
    .once('value', function datosIf(send) {
      pruebaImpresion.innerHTML = ""; // se evita la repeticion de la visita
      firebase.database().ref('/zonaIf').once('value', function datosIf(send) {
            pruebaImpresion.innerHTML = " "; // se evita la repeticion de la visita
            Object.entries(send.val()).forEach(sends => {
              pruebaImpresion.innerHTML += `<div>
            ${sends[1].rut}
            ${sends[1].nombre}
            ${sends[1].apellido}
            ${sends[1].recinto}
            ${sends[1].fecha}  
            ${sends[1].hora}        
            <i class="fas fa-sign-out-alt" data-post="${sends[0]}" onclick="deletePost(event)"></i></div>`;
            });
          });
        });
      // aqui evaluamos la ruta y se imprime en HTML
    });
});

const btnvisit = document.getElementById('btnvisit');
const btnadmin = document.getElementById('btnadmin');

btnvisit.addEventListener('click', () => {
  screenRegister.style.display = 'block';
  screenStart.style.display = 'none';
  screenVisit.style.display = 'none';
  menuDesp.style.display = 'block';
});

btnadmin.addEventListener('click', () => {
  screenRegister.style.display = 'none';
  screenStart.style.display = 'none';
  screenVisit.style.display = 'block';
  menuDesp.style.display = 'block';
});

