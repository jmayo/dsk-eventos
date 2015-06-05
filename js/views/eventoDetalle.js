Personal.Views.EventoDetalle = Backbone.View.extend({
  // events : {
  //    "change #empresa_estado": function(){ this.llenadoComboDependiente(this.catMunicipio,'1', $( "#evento_estado").val(),'',"#evento_municipio");},
  //  },

  el: $('#bloque_evento'),
  className: 'ul_bloque',
  tagName: 'ul',
  template: Handlebars.compile($("#eventos-detalle-template").html()),

  initialize: function () {
    //this.catMunicipio = new Personal.Collections.Catalogos();  
    this.catFuente = new Personal.Collections.Catalogos();  
    this.listenTo(this.model, "change", this.llenado, this);
  },
  reset: function()
  {
    console.log("valores por defecto");
  },
  llenado: function(){
    console.log("llenando el formulario");
    if(this.model.get("id")!=="-1"){
      this.render();
    }
  },
  render: function () {
  // $('#bloque_sucursal').hide();
  // $('#bloque_empresa').show();
   console.log("buscando en el render");
   var detalle = this.model.toJSON();
   var html = this.template(detalle);
   this.$el.html(html);

   var self = this;   
   $("#empresa_fecha_alta").datepicker({dateFormat:"dd/mm/yy"});
  
   this.agregarValidacion();

    var EventoCatalogos = new Personal.Collections.Catalogos();
    EventoCatalogos.claves ="3";
  
    EventoCatalogos.fetch(
      {
        success: function(){
          
          self.llenadoCatalogosCombo(EventoCatalogos.Fuente(),detalle["cdu_fuente"],"#evento_fuente");

        }
          
    });


    },
    llenadoCatalogosCombo: function(catalogo,cdu_seleccion,id_selector){
          var cat = new Backbone.Collection(catalogo);
          var vis = new Personal.Views.EventoCatalogos({
            collection: cat,cdu_seleccionado:cdu_seleccion,id_select: id_selector });
          vis.render();

    },
   llenadoComboDependiente: function(catalogo,id_catalogo,cdu_default,cdu_seleccion,id_selector){
      catalogo.claves = id_catalogo;
      catalogo.cdu_default = cdu_default;
      var cat = catalogo;
      catalogo.fetch({
              success: function(){
                  var vista = new Personal.Views.PersonalCatalogos({
                   collection: cat,cdu_seleccionado: cdu_seleccion ,id_select: id_selector });
                  vista.render();
                }
            });
      this.mostrarSucursalLista(this.model.get("id"));
     
      },
relacionColumnas: function(){
      var columnasCampos ={
     		"id": "#evento_id",
				"descripcion": "#evento_descripcion",
				"cdu_fuente": "#evento_fuente",
			     };
      return columnasCampos;
   },
guardar: function(){
    var data =this.generarJSON();
     var self = this;
    var model = new Personal.Models.empresa(data);
    model.valor = undefined;
    model.pk= data["id"];
    
    this.tipo='POST'
    if(window.Personal.operacion!=="nuevo"){
      this.tipo='PUT';
    }
   
    model.save(null,{
        type: self.tipo,
        success: function(model,response) {
            $('#empresa_id').text(model.get("id"));
            self.mostrarDescripcion(model);
            self.mostrarSucursalLista(model.get("id"));
            window.Personal.operacion="buscar";
            $("#notify_success").notify();
          },
        error: function(model,response, options) {
             $("#notify_error").notify();
              console.log(response.responseText);
        }

    });
  },
  
generarJSON: function(){
      var data ={};
      var relacion =this.relacionColumnas();
      for(var campo in relacion)
      {
        if (relacion.hasOwnProperty(campo))
        {
           var elemento  =$(relacion[campo]).get(0).tagName;
           var tipo = $(relacion[campo]).get(0).type;
           var id_control = relacion[campo];

           if (elemento === "LABEL"){
              data[campo] = $(id_control).text();
           }      
           else if (elemento === "INPUT" || elemento==='TEXTAREA' || elemento==="SELECT"){
              if(tipo=='radio'){
                 data[campo] = $(id_control).get(0).checked
              }
              else{
                 data[campo] = $(id_control).val();
              }
           }      
        }
      }
      return data;
   },
  agregarValidacion: function(){
      var relacion =this.relacionColumnas();
      var listaVal = Personal.app.EventoModelo.validation();
      for(var campo in relacion){
          if (relacion.hasOwnProperty(campo)){
            var id_control = relacion[campo];
            var validacion =listaVal[campo];
            
            if(validacion !== undefined){
                $(id_control).prop('maxlength',validacion['maxlength']);

                $(id_control).prop('pattern',validacion['pattern']); 
                $(id_control).prop('required',validacion['required']);
                var mensaje ="Este campo "
                mensaje += ((validacion['required'] === true) ? 'es obligatorio y ' :'');
                mensaje +=  validacion['title']
                $(id_control).prop('title',mensaje);         
            }
          }
      }
    },
});

