function saveContactForm(infoUsuarioIf) {
  firebase
    .database()
    .ref('zonaIf')
    .push(infoUsuarioIf) // Hacemos referencia el nombre del objeto que contendrá nuestros registros y empujamos los nuevos envios de datos
    .then(function() {
      alert('Se ha enviado un aviso de su llegada'); // Si la petición es correcta y almaceno los datos mostramos un mensaje al usuario.

      alert('mensaje guardado'); // Si la petición es correcta y almaceno los datos mostramos un mensaje al usuario.
    })
    .catch(function() {
      alert('No fue posible guardar su selección'); // En caso de ocurrir un error le mostramos al usuario que ocurrió un error.
    });
}

// aqui evaluamos la ruta y se imprime en HTML

firebase.database().ref('/zonaIf')
  .once('value', function datosIf(send) {
    tblUsersList.innerHTML = ''; // se evita la repeticion de la visita

    // aqui evaluamos la ruta y se imprime en HTML
    firebase
      .database()
      .ref('/zonaIf')
      .once('value', function datosIf(send) {
        tblUsersList.innerHTML = ''; // se evita la repeticion de la visita

        Object.entries(send.val()).forEach(sends => {
          tblUsersList.innerHTML += `<tr>
    <td>  ${sends[1].rut}</td>
     <td>   ${sends[1].nombre}</td>
     <td>   ${sends[1].apellido}</td>
     <td>   ${sends[1].recinto}</td>
     <td>   ${sends[1].fecha}  </td>
     <td>   ${sends[1].hora}</td>
     <i class="fas fa-sign-out-alt" data-post="${ 
  sends[0]
}" onclick="deletePost(event)"></i>
  </tr>`; 
        });
      });
  });

function inicio() {
  screenRegister.style.display = 'none';
  screenStart.style.display = 'block';
  screenVisit.style.display = 'none';
  menuDesp.style.display = 'none';
  closeMenu();
}

// registro de service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// pedir permiso para realizar notificaciones
let messaging = firebase.messaging();
messaging.requestPermission()
  .then(function() {
    console.log('Se han aceptado las notificaciones');
    return messaging.getToken();
  })
  .the(function(token) {
    if (token) { 
      guardarToken(token);
    } else {
      anulaToken();
    }
  })
  .catch(function(err) {
    mensajeFeedback(err);
    console.log('No se ha recibido permiso / token: ', err);
  });
messaging.onMessage(function(payload) {
  console.log('Mensaje recibido con el sitio activo', payload);
  mensajeFeedback(payload.notification.title + ': ' + payload.notification.body);
});


function toggleMenu() {
  // añadir función onclick="toggleMenu()" al botón del nav bar y al botón cerrar.
  if (sideMenu.className.indexOf('menu_closed') >= 0) {
    // primero revisamos si la clase d-none esta
    openMenu(); // si esta la clase quiere decir que el menú esta cerrado, asi que llamamos la funcion para abrirlo
  } else {
    closeMenu(); // si no esta la clase, le indicamos que cierre el menu
  }
}

function openMenu() {
  sideMenu.classList.remove('menu_closed'); // quitando clase display-none
  sideMenu.classList.add('menu_open');
}

function closeMenu() {
  sideMenu.classList.add('menu_closed'); // añadimos la clase display-none
  sideMenu.classList.remove('menu_open');
}

function registrarVisitas() {
  screenRegister.style.display = 'block';
  screenStart.style.display = 'none';
  screenVisit.style.display = 'none';
  menuDesp.style.display = 'block';
  closeMenu();
}

function registrosTotales() {
  screenRegister.style.display = 'none';
  screenStart.style.display = 'none';
  screenVisit.style.display = 'block';
  menuDesp.style.display = 'block';
  closeMenu();
}
