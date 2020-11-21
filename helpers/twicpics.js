export const twicPreview = (
  url,
  twicPath = 'grand-rue',
  sourceUrl = '/img/'
) => {
  const base = url
    .split(sourceUrl)
    .join(`https://dz11y8g2.twic.pics/${twicPath}/`)
  return base + '?twic=v1/output=preview'
}

export const twicify = (url, twicPath = 'grand-rue', sourceUrl = '/img/') => {
  return url.replace(sourceUrl, `image:${twicPath}/`)
}

export const twicifyAirtable = (url) => {
  return twicify(url, 'airtable', 'https://dl.airtable.com/.attachments/')
}
