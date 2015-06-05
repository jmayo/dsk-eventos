Personal.Views.Menu = Backbone.View.extend({
  events :{
     "click .catalogos": "opcion_eventos",
  },

  el: $('.menu'),
  initialize: function () {
   },
   opcion_eventos: function(){
      Personal.app.navigate("Eventos", {trigger: true,replace: false});
   },
});