(function(w,d,undefined){
	var _viewElement = null;
	var _defaultRoute = null;
	var jsMVC=function(){
		this._routeMap={};
	};
	jsMVC.prototype.AddRoute=function(controller,route,template){
		this._routeMap[route]=new routeObj(controller,route,template);
	};
	jsMVC.prototype.initialize=function(){
		var startMVcDelegate = startMVc.bind(this);

		_viewElement = d.querySelector(&apos;[view]&apos;);
		if(!_viewElement) return;

		_defaultRoute = this._routeMap[Object.getOwnPropertyNames(this._routeMap)[0]];
		w.onhashchange = startMvcDelegate;
		startMvcDelegate();
	};
	var routeObj=function(c,r,t){
		this.controller = c;
		this.route = r;
		this.template = t;
	};
	function startMvc(){
		var pageHash=w.location.hash.replace(&apos;#&apos;, &apos;&apos;),
			routeName = null;
			routeObj = null;
	};
})(window,document);
