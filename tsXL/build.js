({
    
    baseUrl: "gz",
    dir: 'gzout',
    modules: [
        { name: 'faceToFace' },
        { name: 'GToilCardExcelImport' }
    ],
    fileExclusionRegExp: /\.ts$/,
   // optimize: "uglify"
    optimize: "none",
})