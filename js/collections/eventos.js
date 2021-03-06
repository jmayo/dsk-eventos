Personal.Collections.Eventos = Backbone.Collection.extend({
  initialize: function(){
  		this.valor = null;
  		this.pk = null;
  }, 
  valor : function(valor){
      this.valor  = valor;
  },
  pk : function(pk){
      this.pk  = pk;
  },
  url : function(){
    var direccion = window.ruta + 'eventos/';

  	if(this.pk!== undefined && this.pk!== null){
   	  direccion = direccion + this.pk + '/';
    }
    if(this.valor!== undefined && this.valor!== null){
   	  direccion = direccion + this.valor + '/';
    } 
   return direccion;
  },
  
  model: Personal.Models.evento,
});
