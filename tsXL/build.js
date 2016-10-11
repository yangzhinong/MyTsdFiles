({
    
    baseUrl: "gz",
    dir: 'gzout',
    modules: [
        { name: 'faceToFace' }
    ],
    fileExclusionRegExp: /\.ts$/,
   // optimize: "uglify"
    optimize: "none",
})