import axios from 'axios';

const baseURL =
    'https://query.wikidata.org/sparql?format=json&query=';

export function getWikiId (search, language){
    const lang = language || 'de';
    const query = `
    SELECT * WHERE {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
                            wikibase:api "EntitySearch";
                            mwapi:search "${search}";
                            mwapi:language "${lang}".
            ?item wikibase:apiOutputItem mwapi:item.
            ?num wikibase:apiOrdinal true.
        }
        ?item (wdt:P279|wdt:P31) ?type
      } ORDER BY ASC(?num) LIMIT 1
    `;
    return axios.get(baseURL + encodeURI(query)).then((res, err) => {
        if (err) return null;

        return res &&
            res.data &&
            res.data.results.bindings &&
            res.data.results.bindings[0] &&
            res.data.results.bindings[0].item &&
            res.data.results.bindings[0].item.value
            ? res.data.results.bindings[0].item.value.replace(
                  'http://www.wikidata.org/entity/',
                  '',
              )
            : null;
    });
};

