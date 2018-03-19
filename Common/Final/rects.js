function rect(){
 
  this.width = 5;
  this.depth = 5;
  this.length = 5;
  this.Xpos = 0;
  this.Ypos = 0;
  this.Zpos = 0;
 
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00} );
  var this.cube = new THREE.Mesh( geometry, material );
  
}

rect.prototype.resize(){
 
  
}
