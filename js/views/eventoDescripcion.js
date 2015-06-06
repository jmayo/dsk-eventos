Personal.Views.EventoDescripcion = Backbone.View.extend({
  tagName: 'a',
  className: 'lnk_servicio',
  template: Handlebars.compile($("#resultados-evento-listado-template").html()),
  attributes: { href: '#' },
  initialize: function () {
     this.listenTo(this.model, "change", this.render, this);
  },
  events:{
    "mousedown ": "seleccionado",
  },
  render: function () {
    var descripcion = this.model.toJSON();
    var html = this.template(descripcion);
    
    this.$el.html(html);
      
    return this;
  },
  seleccionado: function(){
    window.Personal.menu="sucursal";
    //$('#bloque_empresa').hide();
    //$('#bloque_sucursal').show();
 
    if(this.model.get("id")!=="-1"){
      this.EventoModelo = new Personal.Models.evento();
      this.EventoModelo.pk = this.model.get("id");
      this.EventoDetalle = new Personal.Views.EventoDetalle({model: this.EventoModelo});
      this.EventoModelo.fetch();
      $('#fecha_capturista').show();  
      $('#fecha_filtro').hide();  
      $('#fecha_evaluador').hide()
       $('#bloque_evento').show(); 
     }
 },
});



