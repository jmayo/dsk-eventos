Personal.Views.EventoDetalle = Backbone.View.extend({
  events : {
     "mousedown #evento_revisado": "seleccionado",
     "change #evento_estado": function(){ this.llenadoComboDependiente(this.catMunicipio,'2', $( "#evento_estado").val(),'',"#evento_municipio");},
   },

  el: $('#bloque_evento'),
  className: 'ul_bloque',
  tagName: 'ul',
  template: Handlebars.compile($("#eventos-detalle-template").html()),

  seleccionado: function(event){
    var data =this.generarJSON();
    data.revisada =true
    data.fecha_capturista ="05/06/2015";
    data.fecha_filtro ="05/06/2015";
    data.fecha_evaluador="05/06/2015";


    var self = this;
    var model = new Personal.Models.evento(data);
    model.valor = undefined;
    model.pk= data.id;
    this.tipo='PUT';
   
    model.save(null,{
        type: self.tipo,
        success: function(model,response) {
            $('#evento_id').text(model.get("id"));
           // self.mostrarDescripcion(model);
           // self.mostrarSucursalLista(model.get("id"));
            window.Personal.operacion="buscar";
            $("#notify_success").notify();
              Personal.app.EventosListadoVista.cargarLista();
          
          },
        error: function(model,response, options) {
             $("#notify_error").notify();
              console.log(response.responseText);
        }

    });
    
  },
  initialize: function () {
    this.catMunicipio = new Personal.Collections.Catalogos();  
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
   $( '#criticidad_evaluador' ).val(detalle.criticidad_evaluador);
   $( '#criticidad_capturista' ).val(detalle.criticidad_capturista);

   var self = this;   
   $("#empresa_fecha_alta").datepicker({dateFormat:"dd/mm/yy"});
  
   this.agregarValidacion();

    var EventoCatalogos = new Personal.Collections.Catalogos();
    EventoCatalogos.claves ="1,3";
  
    EventoCatalogos.fetch(
      {
        success: function(){
          
          self.llenadoCatalogosCombo(EventoCatalogos.Fuente(),detalle["cdu_fuente"],"#evento_fuente");
          self.llenadoCatalogosCombo(EventoCatalogos.Estado(),detalle["cdu_estado"],"#evento_estado");

        }
          
    });
             this.llenadoComboDependiente(this.catMunicipio,'2', detalle["cdu_estado"],detalle["cdu_municipio"],"#evento_municipio");

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
                  var vista = new Personal.Views.EventoCatalogos({
                   collection: cat,cdu_seleccionado: cdu_seleccion ,id_select: id_selector });
                  vista.render();
                }
            });
      
      },
relacionColumnas: function(){
      var columnasCampos ={
     		"id": "#evento_id",
				"descripcion": "#evento_descripcion",
				"cdu_fuente": "#evento_fuente",
        "reporta": "#evento_reporta",
        "cdu_estado": "#evento_estado",
        "cdu_municipio": "#evento_municipio",
        "criticidad_capturista": "#criticidad_capturista",
        "criticidad_evaluador": "#criticidad_evaluador",
        "observaciones": "#evento_observaciones",
        //"fecha_capturista": "#evento_fecha_capturista",
        //"fecha_filtro": "#evento_fecha_filtro",
        //"fecha_evaluador": "#evento_fecha_evaluador",
        //"revisada": "#evento_revisada_1",
			     };
      return columnasCampos;
   },
guardar: function(){
    var data =this.generarJSON();
    data.criticidad_evaluador =data.criticidad_capturista
    
     data.fecha_capturista ="05/06/2015";
    data.fecha_filtro ="05/06/2015";
    data.fecha_evaluador="05/06/2015";


     var self = this;
    var model = new Personal.Models.evento(data);
    model.valor = undefined;
    model.pk= data["id"];
    this.tipo='POST'
    if(window.Personal.operacion!=="nuevo"){
      this.tipo='PUT';
    }
   
    model.save(null,{
        type: self.tipo,
        success: function(model,response) {
            $('#evento_id').text(model.get("id"));
           // self.mostrarDescripcion(model);
           // self.mostrarSucursalLista(model.get("id"));
            window.Personal.operacion="buscar";
            $("#notify_success").notify();
          
            Personal.app.EventosListadoVista.cargarLista();
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
        console.log(campo)
        if (relacion.hasOwnProperty(campo))
        {
           var elemento  =$(relacion[campo]).get(0).tagName;
           var tipo = $(relacion[campo]).get(0).type;
           var id_control = relacion[campo];

           if (elemento === "LABEL"){
              data[campo] = $(id_control).text();
           }
           else if(elemento==="SELECT" && (campo==='criticidad_capturista' || campo==='criticidad_evaluador')){
              data[campo]=$( id_control + ' option:selected' ).text(); 
              debugger;
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

