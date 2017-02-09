$(function(){
  var Contact=Spine.Model.setup("Contact",["first_name","email"]);
  Contact.extend(Spine.Model.Local);
  var App = new (Spine.Controller.sub());
  var Sidebar = Spine.Controller.create({
    elements: {
      ".items": "items"
    },
    events:{
      "click button": "create"
    },
    create: function(){
      var item = Contact.create();
      App.trigger("edit:contact",item);
    },
    template: function(items){
      return $("#contactsTemplate").tmpl(items);
    },
    init: function(){
      var list = Spine.List.create({
        el: this.items,
        template: this.template
      });
      this.list = new list();
      this.list.bind("chane",this.proxy(function(item){
        App.trigger("show:contact",item);
      }));
      App.bind("show:contact edit:contact",this.list.change);
      Contact.bind("refresh change",this.proxy(this.render));
    },
    render: function(){
      var items = Contact.all();
      this.list.render(items);
    }
  });
  var Contacts = Spine.Controller.create({
    elements:{
      ".show": "showEl",
      ".edit": "editEl",
      ".show .content": "showContent",
      ".edit .content": "editContent"
    },
    events: {
      "click .edits": "edit",
      "click .delete": "destroy",
      "click .save": "save"
    },
    init: function(){
      this.show();
      Contact.bind("change",this.proxy(this.render));
      App.bind("show:contact",this.proxy(this.show));
      App.bind("edit:contact",this.proxy(this.edit));
    },
    change: function(item){
      this.current = item;
      this.render();
    },
    render: function(){
      this.showContent.html($("#contactsTemplate").tmpl(this.current));
      this.editContent.html($("#eidtContactTemplate").tmpl(this.current));
    },
    show: function(item){
      if(item && item.model){
        this.change(item);
      }
      this.showEl.show();
      this.editEl.hide();
    },
    edit: function(item){
      if(item && item.model){
        this.change(item);
      }
      this.showEl.hide();
      this.editEl.show();
    },
    destroy: function(){
      this.current.destroy();
    },
    save: function(){
      var atts = {
        first_name: this.editEl.find("input")[0].value,
        email: this.editEl.find("input")[1].value
      };
      this.current.updateAttributes(atts);
      this.show();
    }
  });

  var Wapp = Spine.Controller.create({
    el: $("body"),
    elements: {
      "#sidebar":"sidebarEl",
      "#main":"contactsEl"
    },
    init: function(){
      this.sidebar = new Sidebar({el:this.sidebarEl});
      this.contact = new Contacts({el:this.contactsEl});
      Contact.fetch();
    }
  });
  new Wapp();
});