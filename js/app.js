var App = Backbone.Router.extend({

  routes: {
    ""         : "showHome",
    "products" : "showProducts",
    "terms"    : "showTerms",
  },

    initialize: function(){
      this.initialSetup();
  },

    // views
    initialSetup: function() {
    this.products     = new Products();
    this.productsView = new ProductsView({collection: this.products});
    this.nav          = new NavView();
    this.homeView     = new HomeView();
    this.termsView    = new TermsView();

    // initial structure
    $("body").html( JST.app() );
    $("header").html( this.nav.render().el );

    // listeners
    this.listenTo(this.products, "request", function(){
      this.nav.showSpinner();
    });

    this.listenTo(this.products, "sync", function(){
      this.nav.hideSpinner();
    });

    this.listenTo(this.nav, "link:click", function(options){
      switch(options.name) {
        case "products":
          this.showProducts();
        break;
        case "terms":
          this.showTerms();
        break;
        default:
          this.showHome();
        break;
      }
      this.navigate(options.href);
    });

      this.$main = $(".main");
    // default to showing home

    // this.showHome();
  },

    showProducts: function() {
      this.$main.html( this.productsView.render().el );
      if( !this.products.length ) {
        this.products.fetch();
      }
    },

    showHome: function() {
      this.$main.html( this.homeView.render().el );
    },

    showTerms: function() {
      this.$main.html( this.termsView.render().el );
    }

});
