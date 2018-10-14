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

function inicio() {
  screenRegister.style.display = 'none';
  screenStart.style.display = 'block';
  screenVisit.style.display = 'none';
  menuDesp.style.display = 'none';
  closeMenu();
}
