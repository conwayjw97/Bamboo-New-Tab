(this.webpackJsonpforest=this.webpackJsonpforest||[]).push([[0],{22:function(e,t,a){},23:function(e,t,a){},24:function(e,t,a){},27:function(e,t,a){"use strict";a.r(t);var i=a(8),n=a.n(i),s=a(14),o=a.n(s),r=(a(22),a(23),a(24),a(10)),c=a(1),d=a(2),h=a(0),l=a(15),u=a(17),p=a(16),f=a.p+"static/media/BambooWithBones.78755282.fbx",m=a.p+"static/media/diffuse.4c274908.jpg",w=a.p+"static/media/specular.c52433c2.jpg",v=a.p+"static/media/normal.69df512f.jpg",b=a.p+"static/media/alpha.d3f17e68.jpg",y=function(){function e(t){Object(c.a)(this,e),this.material=new h.E({map:t.load(m),specularMap:t.load(w),normalMap:t.load(v),alphaMap:t.load(b),alphaTest:.8,side:h.l,opacity:0,transparent:!0}),this.trees=[],this.fadingIn=!1}return Object(d.a)(e,[{key:"load",value:function(e){var t=this;(new u.a).load(f,(function(a){a.traverse((function(e){e instanceof h.T&&(e.material=t.material)}));for(var i=0;i<100;i++){var n=p.a.clone(a);n.position.x=h.y.randFloat(-150,150),n.position.z=h.y.randFloat(-150,150),n.rotation.y=Math.PI*h.y.randFloat(0,1);var s=h.y.randFloat(.5,1.25);n.scale.x=s,n.scale.y=s,n.scale.z=s,e.add(n),t.trees.push(n)}}))}},{key:"fadeIn",value:function(){this.material.opacity<.8?(this.fadingIn=!0,this.material.opacity=.8):this.material.opacity<1?this.material.opacity+=.001:this.material.opacity>1&&(this.fadingIn=!1,this.material.opacity=1)}},{key:"isFadingIn",value:function(){return this.fadingIn}},{key:"getTrees",value:function(){return this.trees}}]),e}(),g=a.p+"static/media/grass.3be89642.jpg",j=function(){function e(t){Object(c.a)(this,e);var a=t.load(g);a.wrapS=h.P,a.wrapT=h.P,a.repeat.set(4,4),this.material=new h.C({map:a,side:h.l,opacity:0,transparent:!0})}return Object(d.a)(e,[{key:"load",value:function(e){var t=new h.J(300,300),a=new h.B(t,this.material);a.rotation.x=Math.PI/2,e.add(a)}},{key:"fadeIn",value:function(){this.material.opacity<1?this.material.opacity+=.005:this.material.opacity>1&&(this.material.opacity=1)}}]),e}(),I=a.p+"static/media/wood.b467f5fc.jpg",O=function(){function e(t){Object(c.a)(this,e);var a=t.load(I);a.wrapS=h.P,a.wrapT=h.P,a.repeat.set(7,1),this.material=new h.C({map:a,side:h.l,opacity:0,transparent:!0})}return Object(d.a)(e,[{key:"load",value:function(e){var t=new h.B(new h.e(300,20,5),this.material);t.position.z=-152.5,t.position.y=10,e.add(t);var a=t.clone();a.position.z=152.5,a.position.y=10,e.add(a);var i=new h.B(new h.e(310,20,5),this.material);i.rotation.y=Math.PI/2,i.position.x=152.5,i.position.z=0,i.position.y=10,e.add(i);var n=i.clone();n.position.x=-152.5,e.add(n)}},{key:"fadeIn",value:function(){this.material.opacity<1?this.material.opacity+=.005:this.material.opacity>1&&(this.material.opacity=1)}}]),e}(),F=function(){function e(t){Object(c.a)(this,e),this.camera=new h.I(45,window.innerWidth/window.innerHeight,.1,1e5),this.camera.position.set(0,250,500),this.renderer=new h.eb({canvas:t,antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setClearColor("rgb(40, 44, 52)"),this.controls=new l.a(this.camera,this.renderer.domElement),this.controls.target=new h.bb(0,110,0),this.scene=new h.Q,this.raycaster=new h.O,this.mouse=new h.ab;var a=new h.Y;this.bamboo=new y(a),this.grass=new j(a),this.sideboard=new O(a),this.render()}return Object(d.a)(e,[{key:"render",value:function(){var e=this;!function t(){requestAnimationFrame(t),e.fadeIn(),e.renderer.render(e.scene,e.camera)}()}},{key:"fadeIn",value:function(){this.bamboo.fadeIn(),this.grass.fadeIn(),this.sideboard.fadeIn()}},{key:"isFadingIn",value:function(){return this.bamboo.isFadingIn}},{key:"setup",value:function(){var e="white";this.scene.fog=new h.r(e,1,900),this.scene.background=new h.i(e),this.scene.add(new h.a(3355443,15)),this.bamboo.load(this.scene),this.grass.load(this.scene),this.sideboard.load(this.scene)}},{key:"onMouseMove",value:function(e,t){console.log("MouseMove"),this.mouse.x=parseFloat(e),this.mouse.y=parseFloat(t),this.raycaster.setFromCamera(this.mouse,this.camera);var a,i=this.raycaster.intersectObjects(this.bamboo.getTrees(),!0),n=Object(r.a)(i);try{for(n.s();!(a=n.n()).done;){var s=a.value;console.log(s.object)}}catch(o){n.e(o)}finally{n.f()}}}]),e}(),k=a(7);var x=function(e){var t=Object(i.useRef)(null);return Object(i.useEffect)((function(){var e=new F(t.current);t.current.onmousemove=function(t){if(console.log(e.isFadingIn),!e.isFadingIn){var a=t.clientX/window.innerWidth*2-1,i=-t.clientY/window.innerHeight*2+1;e.onMouseMove(a,i)}},e.setup()}),[]),Object(k.jsx)("div",{children:Object(k.jsx)("canvas",{ref:t,width:window.innerWidth,height:window.innerHeight,className:"canvas",children:Object(k.jsx)("p",{children:"Your browser doesn't support canvas."})})})};var M=function(){return Object(k.jsx)("div",{className:"App",children:Object(k.jsx)(x,{})})},P=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,28)).then((function(t){var a=t.getCLS,i=t.getFID,n=t.getFCP,s=t.getLCP,o=t.getTTFB;a(e),i(e),n(e),s(e),o(e)}))};o.a.render(Object(k.jsx)(n.a.StrictMode,{children:Object(k.jsx)(M,{})}),document.getElementById("root")),P()}},[[27,1,2]]]);
//# sourceMappingURL=main.d991f761.chunk.js.map