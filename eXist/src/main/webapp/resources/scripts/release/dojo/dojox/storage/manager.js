/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojox.storage.manager"]){dojo._hasResource["dojox.storage.manager"]=true;dojo.provide("dojox.storage.manager");dojox.storage.manager=new function(){this.currentProvider=null;this.available=false;this.providers=[];this._initialized=false;this._onLoadListeners=[];this.initialize=function $DAnO_(){this.autodetect();};this.register=function $DAnP_(_1,_2){this.providers.push(_2);this.providers[_1]=_2;};this.setProvider=function $DAnQ_(_3){};this.autodetect=function $DAnR_(){if(this._initialized){return;}var _4=dojo.config["forceStorageProvider"]||false;var _5;for(var i=0;i<this.providers.length;i++){_5=this.providers[i];if(_4&&_4==_5.declaredClass){_5.isAvailable();break;}else{if(!_4&&_5.isAvailable()){break;}}}if(!_5){this._initialized=true;this.available=false;this.currentProvider=null;console.warn("No storage provider found for this platform");this.loaded();return;}this.currentProvider=_5;dojo.mixin(dojox.storage,this.currentProvider);dojox.storage.initialize();this._initialized=true;this.available=true;};this.isAvailable=function $DAnS_(){return this.available;};this.addOnLoad=function $DAnT_(_7){this._onLoadListeners.push(_7);if(this.isInitialized()){this._fireLoaded();}};this.removeOnLoad=function $DAnU_(_8){for(var i=0;i<this._onLoadListeners.length;i++){if(_8==this._onLoadListeners[i]){this._onLoadListeners=this._onLoadListeners.splice(i,1);break;}}};this.isInitialized=function $DAnV_(){if(this.currentProvider!=null&&this.currentProvider.declaredClass=="dojox.storage.FlashStorageProvider"&&dojox.flash.ready==false){return false;}else{return this._initialized;}};this.supportsProvider=function $DAnW_(_a){try{var _b=eval("new "+_a+"()");var _c=_b.isAvailable();if(!_c){return false;}return _c;}catch(e){return false;}};this.getProvider=function $DAnX_(){return this.currentProvider;};this.loaded=function $DAnY_(){this._fireLoaded();};this._fireLoaded=function $DAnZ_(){dojo.forEach(this._onLoadListeners,function(i){try{i();}catch(e){}});};this.getResourceList=function $DAna_(){var _e=[];dojo.forEach(dojox.storage.manager.providers,function(_f){_e=_e.concat(_f.getResourceList());});return _e;};};}