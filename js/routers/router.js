Personal.Router = Backbone.Router.extend({
  routes: {
    "": "root",
    "Eventos": "evento",
    "Eventos/nuevo/": "eventoNuevo",
    "EventosCapturista": "eventoCapturista",
    "EventosRevisor": "eventoRevisor",
    
    //"Eventos/buscar/:valor_buscado": "eventoFolio",
  },

initialize: function () {
    //104.236.232.238:8000
    window.ruta="http://192.168.0.14:8001/";
    // window.ruta="http://localhost:8001/";
    //window.ruta ="http://10.0.1.147:8000/";
     $('#sucursal_padre').hide(); 
    $('#sucursal_listado').hide(); 
    $('#bloque_evento').hide(); 
 

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

   this.Body = new Personal.Views.Body();
    window.Personal.menu="root";
    window.Personal.op="";
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
   eventoCapturista: function () {
   // window.Personal.menu="personal";
    window.Personal.operacion="nuevo";
    window.Personal.op = "capturar";
    $('#sucursal_padre').hide(); 
    $('#sucursal_listado').hide(); 
    $('#bloque_evento').show(); 
     
    //Cambiamos el valor del id para que detecte cambio en el modelo 
    //Cuando le mandamos los valores por defecto
    this.EventoModelo.set({"id":"-1"});
    this.EventoModelo.set(this.EventoModelo.defaults);
    
    $('#fecha_capturista').hide();  
    $('#fecha_filtro').hide();  
    $('#fecha_evaluador').hide();  

    $('.guardar').show();
    $('.nuevo').show();
    $('.critifin').hide();
    $('.revisado').hide();
  
    console.log("nuevo evento");
  },
  eventoRevisor: function(){
      window.Personal.op = "revisar";
      this.EventosListadoVista.cargarLista();
      $('#sucursal_padre').show();
      $('#sucursal_listado').show(); 
      $('#bloque_evento').show(); 

      this.EventoModelo.set({"id":"-1"});
      this.EventoModelo.set(this.EventoModelo.defaults);

      $('.guardar').hide();
      $('.nuevo').hide();
      $('#fecha_capturista').show();  
      $('#fecha_filtro').hide();  
      $('#fecha_evaluador').hide();  
      $('.critifin').show();
      $('.revisado').show();
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
