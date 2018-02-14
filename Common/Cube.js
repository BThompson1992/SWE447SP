
function Cube( vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    this.positions = { 
        values : new Float32Array([
              // Front face
		    -1.0, -1.0, -1.0, // Vertex 0
		    -1.0, 1.0, -1.0, // Vertex 1
		    1.0, 1.0, -1.0, // Vertex 2
		    1.0, -1.0, -1.0, // Vertex 3
			// Back face
		    1.0, 1.0, 1.0, // Vertex 4
		    1.0, -1.0, 1.0, // Vertex 5
		    1.0, 1.0, -1.0, // Vertex 6
		    -1.0, 1.0, 1.0, // Vertex 7
			// Top face
		    1.0, 1.0, 1.0, // Vertex 8
		    1.0, 1.0, -1.0, // Vertex 9
		   -1.0, 1.0, 1.0, // Vertex 10
		   -1.0, 1.0, -1.0, // Vertex 11
			// Bottom face
		    -1.0, -1.0, 1.0, // Vertex 12
		    -1.0, -1.0,- 1.0, // Vertex 13
		     1.0, -1.0, -1.0, // Vertex 14
		     1.0, -1.0, 1.0, // Vertex 15
			// Left face
		    -1.0, -1.0, 1.0, // Vertex 16
		    -1.0, -1.0, -1.0, // Vertex 17
		    1.0, 1.0, -1.0, // Vertex 18
		    1.0, 1.0, 1.0, // Vertex 19
			// Right face
		    1.0, 1.0, -1.0, // Vertex 20
		    1.0, 1.0, 1.0, // Vertex 21
		    -1.0, -1.0, 1.0, // Vertex 22
		    -1.0, -1.0, -1.0 // Vertex 23
            ]),
        numComponents : 3
    };
    
    this.indices = { 
        values : new Uint16Array([
                  	       0, 1, 2, 0, 2, 3,        //Front Face
			       4, 5, 6, 4, 6, 7,        //Back Face
			       8, 9, 10, 8, 10, 11,     //Top Face 
			       12, 13, 14, 12, 14, 15,  //Bottom Face
			       16, 17, 18, 16, 18, 19,  //Left Face
			       20, 21, 22, 20, 22, 23   //Right Face
        ])
    };
    this.indices.count = this.indices.values.length;

    
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    MVLoc = gl.getUniformLocation( this.program, "MV" );
    ViewLoc = gl.getUniformLocation( this.program, "nView" );
	
    this.MV = undefined;
    this.view = undefined;
	
    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );
	gl.uniformMatrix4fv( ViewLoc, gl.FALSE, flatten(this.view) );

        // Draw the cube's base
        gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
    }
};
