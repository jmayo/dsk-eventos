Personal.Router = Backbone.Router.extend({
  routes: {
    "": "root",
    "Eventos": "evento",
    "Eventos/nuevo/": "eventoNuevo",
    //"Eventos/buscar/:valor_buscado": "eventoFolio",
  },

initialize: function () {
    //104.236.232.238:8000
    //winow.ruta="http://192.168.0.14:8000/";
     window.ruta="http://localhost:8001/";
    //window.ruta ="http://10.0.1.147:8000/";
 

    this.Evento = new Personal.Collections.Eventos();          
    this.EventoListado = new Personal.Collections.Eventos();          

    this.MenuVista = new Personal.Views.Menu(); 

    this.ContenidoVista = new Personal.Views.Contenido(); 
 
    this.CajaOperaciones= new Personal.Views.CajaOperaciones();
 
    this.EventosListadoVista = new Personal.Views.EventoListados({collection: this.EventoListado});

   
    this.EventoModelo = new Personal.Models.evento();
    this.EventoModelo.set({"id":"-1"});
    this.EventoDetalle = new Personal.Views.EventoDetalle({model: this.EventoModelo});    
    
    this.EventosListadoVista.cargarLista();

    window.Personal.menu="root";
  },

  root: function () {
    console.log("Estas en el indice");
  },


  evento: function () {
      
    //Si es la primera vez cambiamos el id para llenar el formulario
//     window.Personal.menu="personal";
    window.Personal.operacion="buscar";
    if( this.EventoModelo.get("id")==="-1" ||  this.EventoModelo.get("id")===""){
      this.EventoModelo.set({"id":""});
      window.Personal.operacion="nuevo";
  
    }
    window.Personal.menu="eventos";
   
    console.log("Estas en la lista de personal");
  },

   eventoNuevo: function () {
   // window.Personal.menu="personal";
    window.Personal.operacion="nuevo";
 
    //Cambiamos el valor del id para que detecte cambio en el modelo 
    //Cuando le mandamos los valores por defecto
    this.EventoModelo.set({"id":"-1"});
    this.EventoModelo.set(this.EventoModelo.defaults);
  
    console.log("nuevo evento");
  },


//***** FUNCIONES GENERICAS ****************
  fetchData:function(ruta_json,funcion_llenado,clave){
      var self = this;
      var val = clave;

      $.ajax({
      dataType: 'json',
      data: "",
      url: ruta_json,
      success: function(datos){
         for(var index in datos){
               //calls nos permite llamar a una funcion pasandole el this que la ejecutara
               funcion_llenado.call(self,datos[index],val);
         }
        },
       error: function() { alert("Error leyendo fichero jsonP"); }
    });
    }

});
