exports.getIdFromURl = (imageURL) => {
    const splitUrl = imageURL.split('/voyage-nepal-files/');
    return splitUrl[1];
}