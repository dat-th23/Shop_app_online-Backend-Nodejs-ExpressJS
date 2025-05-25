const BASE_URL = process.env.BASE_URL + process.env.PORT

/**
 * Returns the full URL path of the image
 * @param {string|null} imageName The name of the image file
 * @returns {string|null} The full URL path or null if there is no image
 */

function getImageUrl(imageName) {
    if (!imageName) return null
    return `${BASE_URL}/api/images/${imageName}`
}

module.exports = {
    getImageUrl
}
