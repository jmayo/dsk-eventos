Personal.Views.Menu = Backbone.View.extend({
  events :{
     "click .catalogos": "opcion_eventos",
     "click .catalogos0": "opcion_capturar", 
     "click .catalogos1": "opcion_revisar",
      
  },

  el: $('.menu'),
  initialize: function () {
   },
   opcion_eventos: function(){
      Personal.app.navigate("Eventos", {trigger: true,replace: false});
   },
   opcion_capturar: function(){
	  Personal.app.navigate("EventosCapturista", {trigger: true,replace: false});
   	  console.log("menu para capturar");
   },
   opcion_revisar: function(){
   	  Personal.app.navigate("EventosRevisor", {trigger: true,replace: false});
      console.log("menu para revisar");
   },
});