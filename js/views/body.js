Personal.Views.Body = Backbone.View.extend({
  events :{
     "mousemove":"iniciarConteo",
  },

  el: $('body'),
  initialize: function () {
    localStorage.setItem("tiempo",0);
    var timeoutID;
    this.startTimer();
  		//window.routers.base.on('router:root' , this.inicio());
  		//Personal.app.on("route:root", this.inicio());
   },
  
   InicializarTiempo: function(){
      this.addEventListener("mousemove", resetTimer, false);
      this.addEventListener("mousedown", resetTimer, false);
      this.addEventListener("keypress", resetTimer, false);
      this.addEventListener("DOMMouseScroll", resetTimer, false);
      this.addEventListener("mousewheel", resetTimer, false);
      this.addEventListener("touchmove", resetTimer, false);
      this.addEventListener("MSPointerMove", resetTimer, false);
   
      this.startTimer();
  },
  startTimer: function() {
    	// wait 2 seconds before calling goInactive
    	self =this;
    	//this.timeoutID = window.setTimeout(this.goInactive, 7000);
    	this.timeoutID = window.setTimeout(function(){
    		if(window.Personal.op === "revisar"){
    				console.log("se termino la sesion");  Personal.app.EventosListadoVista.cargarLista(); console.log(window.Personal.op ); 
    				 }
    			self.startTimer();
    		 }, 7000);
  },
  goActive: function() {
    // do something
         
    this.startTimer();
},
  iniciarConteo: function(){
  	console.log("Estas moviendo el mouse");

    window.clearTimeout(this.timeoutID);
 
    this.goActive();
  },
  goInactive: function(){
  		console.log("se termino la sesion");
  	    this.startTimer();
  }
}); 