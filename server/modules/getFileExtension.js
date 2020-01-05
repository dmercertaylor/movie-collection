module.exports = (fileName) => {
    let fileExt = '';
    if(fileName.includes('.')){
        fileExt = fileName.split('.');
        fileExt = `.${fileExt[fileExt.length - 1]}`;
    }
    return fileExt;
}