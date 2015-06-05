$(function() {
  Personal.app = new Personal.Router();
 
  Personal.app.on("route:eventos",Personal.app.ContenidoVista.mostrarMenuEventos)
  // Backbone.history.stop(); 
   Backbone.history.start({
      root: '/',
      silent: true,
     // pushState: true,
    //  hashChange: true,
    });
    //Personal.app.navigate('', true);
});
