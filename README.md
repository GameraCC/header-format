# header-format
Formats key-value headers to JSON properties

## Installation
```
npm install- g
```

## Usage
```powershell
PS C:\> chromehf '
  header_key: header_value
  header_key1: header_value2
  header_key2: header_value3
'
```

```
  "header_key": "header_value",
  "header_key1": "header_value2",
  "header_key2": "header_value3"
```

## Notes
Transforms headers based on [hard coded parameters](bin/index.js#L6-L16)

### Current Transformations
```
  user-agent -> replace with "this.userAgent"
  cookie -> delete
```
