/**
 * Headers whom case insensitive keys should be replaced with the given values, or be removed
 * 
 * @type {Array.<{key: string, value: string | undefined, remove: boolean}>}
 */
 const headerTransformations = [
    {
        key: 'user-agent',
        value: 'this.userAgent',
        remove: false
    },
    {
        key: 'cookie',
        remove: true
    }
]

const escapeStringAppostrophes = (string) => {
    return string.includes("'") ? string.replace(/'/g, '\'') : string
}

/**
 * Formats a string of unformatted headers, delimited by carriage returns, to a string of javascript formatted headers, delimited by line breaks
 * 
 * @param {string} headers - Unformatted headers delimited by carriage return
 * @returns {string} - Headers formatted for javascript
 */
module.exports.formatChromeHeaders = (headers) => {
    try {
        const formattedHeaders = headers.reduce((acc, cur, i) => {
            // Split the header by the first delimiting ": "
            const splitHeader = cur.split(/(: )/)

            // Get the header key and value, if the value is undefined set it to an empty string
            let key = splitHeader[0].toLowerCase(),
                value = splitHeader[2] ?? ''

            // Execute header replacements, this is slow as it iterates over the header replacement array each iteration over a header, but speed is arbitrary
            const transformation = headerTransformations.find(transform => transform.key === key)

            if (transformation && transformation.remove) return acc
            else {
                // Escape the key and values in appostrophes
                acc.push(`'${escapeStringAppostrophes(key)}': ` + (transformation ? transformation.value : `'${escapeStringAppostrophes(value)}'`))

                return acc
            }
        }, []).join(',\n')

        return formattedHeaders
    } catch (err) {
        console.error(err)
        return 'Error Formatting Chrome Headers'
    }
}

