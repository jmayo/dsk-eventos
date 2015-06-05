Personal.Collections.Catalogos = Backbone.Collection.extend({
  claves : function(claves){
      this.claves  = claves;
     
  },
  cdu_default : function(cdu_default){
      this.cdu_default  = cdu_default;
  },

  initialize: function(){
  	 this.cdu_default = '';
  },

  url : function(){
   return window.ruta + 'catalogos_detalle/' + this.claves + '/' + this.cdu_default;
  },
  
  model: Personal.Models.catalogo,

  Estado: function () {
		return this.where({catalogos: 1});
	},
  Municipio: function () {
		return this.where({catalogos: 2});
	},
  Fuente: function () {
		return this.where({catalogos: 3});
	},
  Criticidad: function () {
    return this.where({catalogos: 3});
  },
});
