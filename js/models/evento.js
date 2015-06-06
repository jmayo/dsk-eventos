Personal.Models.evento = Backbone.Model.extend({
  initialize: function(){
  		this.valor = null;
  		this.pk = null;
      
      this.camposValidar();
      this.date = new Date();
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
      if(window.Personal.operacion==='buscar' && this.pk!==""){
   	    direccion = direccion + this.pk + '/';
      }
   } 
   if(this.valor!== undefined && this.valor!== null){
   	  direccion = direccion + 'buscar/' + this.valor + '/';
   } 
   return direccion;
  },
  defaults : {
        "id": "",
        "descripcion": "Descripcion",
        "cdu_fuente": "0030001",
         "criticidad_capturista": 2,
         "criticidad_evaluador": 3,
         "reporta": "a",
         "cdu_estado": "0010009",
         "cdu_municipio": "0020268",
         "observaciones": "Observaciones",
         "fecha_capturista": "05/06/2015",
         "fecha_filtro":  "06/06/2015",
         "fecha_evaluador":  "07/06/2015",
         "revisada": false
    },

  camposValidar: function(){
      var vali = new Personal.Models.validacion();
      vali.Campo('descripcion',1,1000,vali.AlfaNumerico());
      vali.Campo('criticidad_capturista',1,10,vali.Numeros());
      vali.Campo('criticidad_evaluador',1,10,vali.Numeros());
      vali.Campo('reporta',1,100,vali.AlfaNumerico()); 
      vali.Campo('observaciones',1,1000,vali.AlfaNumerico()); 
      vali.Campo('fecha_capturista',1,10,vali.Fecha()); 
      vali.Campo('fecha_filtro',1,10,vali.Fecha()); 
      vali.Campo('fecha_evaluador',1,10,vali.Fecha()); 
      this.listado = vali.Listado();
  },
  validation: function() {
      return this.listado;  
  }
});
