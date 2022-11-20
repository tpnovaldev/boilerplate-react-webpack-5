module.exports = function (api) {
  api.cache(true)

  const presets = [
    [
      "@babel/preset-env",
      {
        "targets": [">0.25%", "not ie 11"],
        "debug": true,
        "useBuiltIns": "usage",
      }
    ],
    "@babel/preset-react"
  ]

  return {
    presets
  }
}
