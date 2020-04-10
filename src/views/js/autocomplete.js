function autocomplete(inp, arr) {
  /* la función de autocompletar toma dos argumentos,
      el elemento de campo de texto y una matriz de posibles valores autocompletados: */
  var currentFocus;
  /* ejecuta una función cuando alguien escribe en el campo de texto: */
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /* cierra cualquier lista ya abierta de valores autocompletados */
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /* crea un elemento DIV que contendrá los elementos (valores): */
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /* agrega el elemento DIV como hijo del contenedor de autocompletar: */
      this.parentNode.appendChild(a);
      /* para cada elemento de la matriz ... */
      for (i = 0; i < arr.length; i++) {
        /* comprueba si el elemento comienza con las mismas letras que el valor del campo de texto: */
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /* crea un elemento DIV para cada elemento coincidente: */
          b = document.createElement("DIV");
          /* pon las letras coincidentes en negrita: */
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /* inserta un campo de entrada que contendrá el valor del elemento de matriz actual: */
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /* ejecuta una función cuando alguien hace clic en el valor del elemento (elemento DIV): */
          b.addEventListener("click", function(e) {
            /* inserte el valor para el campo de texto de autocompletar: */
              inp.value = this.getElementsByTagName("input")[0].value;
              /* cierra la lista de valores autocompletados,
              (o cualquier otra lista abierta de valores autocompletados: */
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /* ejecutar una función presiona una tecla en el teclado: */
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /* Si se presiona la tecla de flecha ABAJO,
                aumentar la variable currentFocus: */
        currentFocus++;
        /* yy hacer que el elemento actual sea más visible: */
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /* Si se presiona la tecla de flecha ARRIBA,
        disminuir la variable currentFocus: */
        currentFocus--;
        /* yy hacer que el elemento actual sea más visible: */
        addActive(x);
      } else if (e.keyCode == 13) {
        /* Si se presiona la tecla ENTRAR, evite que se envíe el formulario, */
        e.preventDefault();
        if (currentFocus > -1) {
            /* y simular un clic en el elemento "activo": */
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /* una función para clasificar un elemento como "activo": */
    if (!x) return false;
    /* comienza por eliminar la clase "activa" en todos los elementos: */
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /* Agregar clase "autocompletar-activa": */
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /* una función para eliminar la clase "activa" de todos los elementos de autocompletar: */
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /* cierra todas las listas de autocompletar en el documento,
    excepto el que pasó como argumento: */
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /* ejecuta una función cuando alguien hace clic en el documento: */
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/* Una matriz que contiene todos los nombres de personas: */
var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

/* inicia la función de autocompletar en el elemento "myInput" y pasa la matriz de países como posibles valores de autocompletar: */
autocomplete(document.getElementById("myInput"), countries);
