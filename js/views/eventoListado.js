Personal.Views.EventoListados = Backbone.View.extend({
  el: $('#sucursal_listado'),
 // template: Handlebars.compile($("#resultados-empresa-sucursal-listado-template").html()),

  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.limpiarTodo, this);
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },
  addOne: function (evento) {
    var busquedaView = new Personal.Views.EventoDescripcion({ model: evento }); 
    if(evento.get("id")==="-1"){
      this.$el.prepend(busquedaView.render().el);  
    }
    else{
      this.$el.append(busquedaView.render().el);
    }
  },
   limpiarTodo:function(){
    console.log("limpiando resultados");
     this.$el.empty();
  },
  cargarLista: function(){

    this.collection.valor = 'norevisado';
    this.collection.reset();
    this.collection.fetch().always(function(){})    

  },
  
});
