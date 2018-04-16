function rect(){
 
  this.Xpos = 0;
  this.Ypos = 0;
  this.Zpos = 0;
 
  var geometry = new THREE.BoxBufferGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00} );
  this.cube = new THREE.Mesh( geometry, material );
  
}

rect.prototype.resize = function(height) {
 
this.cube.scale.y = (height / 2) + 1;

};
