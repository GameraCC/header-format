#!/usr/bin/env node

const colors = require('colors')
const { formatChromeHeaders } = require('../lib')

// Get & format inputted headers because windows shell interprets double quoted header values as a different key value input argument
let input = process.argv.slice(2, process.argv.length).join(' ').split('\n').filter(x => x != '').map(concatenated => {
    concatenated = concatenated.split(/(: )/)

    const header = {
        key: concatenated[0].toLowerCase(),
        value: concatenated[2] ?? ''
    }

    return header
})

// Fix sec- headers with quoted versions, brands and entire header values
const quotedBrandValueSecHeaders = ['sec-ch-ua']
quotedBrandValueSecHeaders.forEach(key => {
    const secHeaderIndex = input.findIndex(header => header.key === key)
    if (secHeaderIndex > -1) {
        input[secHeaderIndex].value = input[secHeaderIndex].value.split(', ').map(x => {
            x = x.split(/(;v=)/)
            return `"${x[0]}";v="${x[2]}"`
        }).join(', ')
    }
})

// Fix sec-ch-ua-windows header
const quotedHeaders = ['sec-ch-ua-platform-version', 'sec-ch-ua-platform']
quotedHeaders.forEach(key => {
    const secHeaderIndex = input.findIndex(header => header.key === key)
    if (secHeaderIndex > -1) input[secHeaderIndex].value = `"${input[secHeaderIndex].value}"`
})

const inputFormatted = input.reduce((acc, cur) => {
    acc.push(`${cur.key}: ${cur.value}`)
    return acc
}, [])

// Format headers
const formatted = formatChromeHeaders(inputFormatted)

console.log(colors.green(formatted))
