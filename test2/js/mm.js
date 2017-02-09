if(typeof Object.create !== 'function'){
	Object.create = function(o){
		function F(){}
		F.prototype = o;
		return new F();
	}
}
//mvc中的模型
var Model = {
	inherited: function(){},
	created: function(){
		this.records = {};
	},
	prototype:{
		init: function(){}
	},
	create: function(){
		var object = Object.create(this);
		object.parent = this;
		object.prototype = object.fn = Object.create(this.prototype);
		object.created();
		this.inherited(object);
		return object;
	},
	init: function(){
		var instance = Object.create(this.prototype);
		instance.parent = this;
		instance.init.apply(instance,arguments);
		return instance;
	},
	extend: function(o){
		var extended = o.extended;
		jQuery.extend(this,o);
		if(extended) extended(this);
	},
	include: function(o){
		var included = o.included;
		jQuery.extend(this.prototype,o);
		if(included) included(this);
	}
};
Model.extend({
	find: function(id){
		return this.records[id] || throw("Unknown record");
	}
});
Model.include({
	init: function(atts){
		if(atts) this.load(atts);
	},
	load: function(attributes){
		for(var name in attributes)
			this[name] = attributes[name];
	}
});
Model.records = {};

Model.include({
	newRecord: true,
	create: function(){
		this.newRecord = false;
		this.parent.records[this.id] = this;
	},
	destroy: function(){
		delete this.parent.records[this.id];
	},
	update: function(){
		this.parent.records[this.id] = this;
	},
	save: function(){
		this.newRecord? this.create():this.update();
	}
});

Math.guid = function(){
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
		var r = Math.random()*16|0,v = c=='x'?r:(r&0x3|0x8);
		return v.toString(16);
	}).toUpperCase();
};

Model.extend({
	create: function(){
		if(!this.id) this.id=Math.guid();
		this.newRecord = false;
		this.parenet.records[this.id] = this;
	},
	populate: function(values){
		this.records = {};
		
	}
});





