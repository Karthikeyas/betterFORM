/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["betterform.ui.select1.RadioItemset"]){dojo._hasResource["betterform.ui.select1.RadioItemset"]=true;dojo.provide("betterform.ui.select1.RadioItemset");dojo.require("dijit._Widget");dojo.require("betterform.ui.ControlValue");dojo.require("dojox.data.dom");dojo.declare("betterform.ui.select1.RadioItemset",dijit._Widget,{values:"",handleStateChanged:function $DA4z_(_1){if(_1.targetName=="label"){dojo.byId(_1.parentId+"-label").innerHTML=_1.value;}else{if(_1.targetName=="value"){dijit.byId(_1.parentId+"-value")._handleSetControlValue(_1.value);}else{console.warn("RadioItemSet.handleStateChanged: no action taken for contextInfo: ",_1);}}},handleInsert:function $DA40_(_2){var _3=document.createElement("span");dojo.addClass(_3,"xfSelectorItem");dojo.addClass(_3,"xfEnabled");dojo.addClass(_3,"xfReadWrite");dojo.addClass(_3,"xfOptional");dojo.addClass(_3,"xfValid");dojo.attr(_3,"controltype","radioButtonEntry");var _4=_2.generatedIds;var _5=_4[_2.prototypeId];dojo.attr(_3,"id",_5);var _6=document.createElement("label");dojo.addClass(_6,"xfRadioLabel");dojo.attr(_6,"id",_5+"-label");dojo.attr(_6,"for",_5+"-value");_6.innerHTML=_2.label;var _7=this.domNode.parentNode;while(!dojo.hasClass(_7,"xfSelect1")){_7=_7.parentNode;}var _8=document.createElement("input");if(dojo.hasClass(_8,"xfValue")){dojo.removeClass(_8,"xfValue");}dojo.addClass(_8,"xfRadioValue");dojo.attr(_8,"id",_5+"-value");dojo.attr(_8,"selected","false");dojo.attr(_8,"parentId",_7.id);dojo.attr(_8,"name",_7.id+"-value");dojo.attr(_8,"value","");dojo.attr(_8,"datatype","radio");dojo.attr(_8,"controltype","radio");dojo.place(_8,_3);dojo.place(_6,_3);var _9=dojo.byId(_2.originalId+"-prototype");var _a=dojo.query("[controltype='output-control']",_9);if(_a!=undefined&&_a!=""){for(var _b=0;_b<=_a.length;_b++){var _c=_a[i].cloneNode(true);dojo.attr(_c,"id",_4[_c.id]);dojo.attr(_c,"parentId",_7.id);dojo.attr(_c,"parentid",_7.id);this._replacePrototypeIds(_c,_4);dojo.place(_c,_6);}}var _d=new betterform.ui.Control({contextInfo:_2},_3);dojo.place(_3,this.domNode,_2.position);},_replacePrototypeIds:function $DA41_(_e,_f){dojo.query("*",_e).forEach(function(_10){var _11=dojo.attr(_10,"id");if(_11!=undefined&&_f[_11]!=undefined){dojo.attr(_10,"id",_f[_11]);}else{if(_11!=undefined){var _12;var _13;if(_11.indexOf("-value")!=-1){_12=_11.substring(0,_11.indexOf("-value"));_13="-value";}else{if(_11.indexOf("-label")!=-1){_12=_11.substring(0,_11.indexOf("-label"));_13="-label";}else{if(_11.indexOf("-hint")!=-1){_12=_11.substring(0,_11.indexOf("-hint"));_13="-hint";}else{if(_11.indexOf("-help")!=-1){_12=_11.substring(0,_11.indexOf("-help"));_13="-help";}else{if(_11.indexOf("-alert")!=-1){_12=_11.substring(0,_11.indexOf("-alert"));_13="-alert";}else{return;}}}}}var _14=_f[_12]+_13;dojo.attr(_10,"id",_14);}}var _15=dojo.attr(_10,"for");if(_15!=undefined&&_f[_15]!=undefined){dojo.attr(_10,"for",_f[_15]);}else{if(_15!=undefined){var _16;var _17;if(_15.indexOf("-value")!=-1){_16=_15.substring(0,_15.indexOf("-value"));_17="-value";}else{return;}var _14=_f[_16]+_17;dojo.attr(_10,"for",_14);}}});},_replaceRepeatItemClasses:function $DA42_(_18){dojo.removeClass(_18,"xfRepeatPrototype");dojo.removeClass(_18,"xfDisabled");dojo.addClass(_18,"xfRepeatItem");dojo.addClass(_18,"xfEnabled");dojo.addClass(_18,"xfRepeatIndexPre");},handleDelete:function $DA43_(_19){var _1a=dojo.query(".xfSelectorItem",this.domNode)[_19.position-1];this.domNode.removeChild(_1a);}});}