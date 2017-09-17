export default function fetchCollection(collection, params = {}, options = {}) {
  return fetch(
    `https://v3v10.vitechinc.com/solr/${collection}/select${jsonToQueryString(params)}`,
    options
  )
    .then((res) => res.json());
}

function jsonToQueryString(json) {
  return `?${
    Object.keys(json).map((key) => `${encodeURIComponent(key)}=${
        encodeURIComponent(json[key])}`).join('&')}`;
}
