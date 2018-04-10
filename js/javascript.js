window.onload = init;

// The producto manager as a global variable
var cm; 

function init() { 
  // create an instance of the producto manager
  cm = new productoManager();
  
    cm.printproductosToConsole();

    // Display productos in a table
    // Pass the id of the HTML element that will contain the table
    cm.displayproductosAsATable("productos");
}

function formSubmitted() {
  // Get the values from input fields
  var nombre = document.querySelector("#nombre");
  var cantidad = document.querySelector("#cantidad");
  var tipo = document.querySelector(".register-switch-input:checked");
  var comentario = document.querySelector("#comentario");
    var newproducto = new producto(nombre.value, cantidad.value, tipo.value, comentario.value);
  cm.add(newproducto);
  
  // vacia los campos
  nombre.value = "";
  cantidad.value = "";
  comentario.value = "";
  
  // recarga la tabla
  cm.displayproductosAsATable("productos");
  
  // impide el reenvio en el explorador
  return false;
}

//elimina todas las filass de la tablas
function emptyList() {
  cm.empty();
    cm.displayproductosAsATable("productos");
}

//permite borrar filas
 function deleteRow(rowButton) {
        var pos = rowButton.parentNode.parentNode.rowIndex;  // r.[((cell)row)].rowIndex
        document.getElementById("myTable").deleteRow(pos);
    }

class producto {
  constructor(nombre, cantidad, tipo, comentario) {
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.tipo = tipo;
    this.comentario = comentario;
  }
}

class productoManager {
  constructor() {
    // creamos un array vacio
    this.listOfproductos = [];
  }
  
  
  // borra todo el contenido
  empty() {
    this.listOfproductos = [];
  }
  
  add(producto) {
    this.listOfproductos.push(producto);
  }
  
  
  printproductosToConsole() {
    this.listOfproductos.forEach(function(c) {
      console.log(c.nombre);
    });
  }
  

  
  
    displayproductosAsATable(idOfContainer) {

      let container = document.querySelector("#" + idOfContainer);
      container.innerHTML = "";
  

      var table = document.createElement("table");
          table.id="myTable";

          var row = table.insertRow();
          row.innerHTML ='<tr><th>nombre</th><th>cantidad</th><th>tipo</th><th>comentario</th><th>borrar</th></tr>'


      this.listOfproductos.forEach(function(currentproducto) {
          // crea una fila
          row = table.insertRow();
        
      row.innerHTML = "<td>" + currentproducto.nombre + "</td>"
              + "<td>" + currentproducto.cantidad + "</td>"
              + "<td>" + currentproducto.tipo + "</td>"
              + "<td>" + currentproducto.comentario + "</td>"
              +'<td><input type="button" value="Delete" onclick="deleteRow(this)"></td>'
      });
  
      // dibuja la tabla
      container.appendChild(table);
    }
}

/*
  addTestData() {
    var c1 = new producto("hola", "16", "si", "que tal");
      var c2 = new producto("adios", "45", "si", "bien y tu");
      var c3 = new producto("meh", "12", "si", "todo bien");
    
    this.add(c1);
    this.add(c2);
    this.add(c3);
    
  }
  */