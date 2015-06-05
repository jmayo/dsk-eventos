Personal.Views.Contenido = Backbone.View.extend({
  el: $('.contenido_principal'),

  initialize: function () {
      $('.contenido_evento').hide();
   },
   mostrarMenuEvento: function(){
   			window.Personal.menu="evento";
           if (this.CajaBusqueda){
            this.CajaBusqueda.close();
          } 
          
          console.log("ruta eventos")
          $('.contenido_evento').show();
   },
});
