Personal.Views.CajaOperaciones = Backbone.View.extend({
     events: {
	   "click .nuevo": "nuevo", 
      "click .guardar": "guardar",
   },
    el: $('.caja_acciones'),

    initialize: function (){
   },
   nuevo: function(){
      console.log("nuevo registro");
      if(window.Personal.menu==="eventos"){
         Personal.app.navigate("Eventos/nuevo/", {trigger: true, replace: true});
       }
      
   },
  guardar: function(){
    console.log("guardando");
    
    if(window.Personal.menu==="eventos"){
      Personal.app.EventoDetalle.guardar();
      console.log("guardando eventos");
    }
  }
});
