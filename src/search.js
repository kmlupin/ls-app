import axios from 'axios';

const baseURL =
    'https://query.wikidata.org/sparql?format=json&query=';

//Ausgabe ID der Suche
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

//Ausgabe Geburts Ort
export function getGeburtsOrt (search, language){
    const lang = language || 'de';
    const query = `
    SELECT ?personLabel ?placeOfBirthLabel {
        BIND("${search}"@${lang} AS ?personLabel) ?person wdt:P19 ?placeOfBirth;  
        wikibase:sitelinks ?linkcount;
        rdfs:label ?personLabel.        
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${lang}". }
    }
    LIMIT 1
    `;

    return axios.get(baseURL + encodeURI(query)).then((res, err) => {
        if (err) return null;

        return axios
        .get(baseURL + encodeURI(query))
        .then((res) =>
            res.data.results.bindings[0] &&
            res.data.results.bindings[0].placeOfBirthLabel &&
            res.data.results.bindings[0].placeOfBirthLabel.value
                ? res.data.results.bindings[0].placeOfBirthLabel.value
                : null,
        );
    });
};

//Ausgabe Geburtsland
export function getGeburtsLand (search, language){
    const lang = language || 'en';
    const query = `
    SELECT ?personLabel ?countryLabel WHERE {
        BIND("${search}"@${lang} AS ?personLabel) ?person wdt:P19 ?placeOfBirth;          
        rdfs:label ?personLabel.    
        ?placeOfBirth (wdt:P17+) ?country.    
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],de". }
    }    
    LIMIT 1
    `;

    return axios.get(baseURL + encodeURI(query)).then((res, err) => {
        if (err) return null;

        return axios
        .get(baseURL + encodeURI(query))
        .then((res) =>
            res.data.results.bindings[0] &&
            res.data.results.bindings[0].countryLabel &&
            res.data.results.bindings[0].countryLabel.value
                ? res.data.results.bindings[0].countryLabel.value
                : null,
        );
    });
};

export function getGeburtsDatum (search, language){
    const lang = language || 'de';
    const query = `
    SELECT ?personLabel (CONCAT(STR(DAY(?dateOfBirth)),".",STR(MONTH(?dateOfBirth)),".",STR(YEAR(?dateOfBirth))) as ?dateOfBirthStr) WHERE {
        BIND("${search}"@${lang} AS ?personLabel) ?person wdt:P569 ?dateOfBirth;      
        wikibase:sitelinks ?linkcount;
        rdfs:label ?personLabel.  
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],de". }
    }
    GROUP BY ?personLabel ?dateOfBirth
    LIMIT 1
    `;

    return axios.get(baseURL + encodeURI(query)).then((res, err) => {
        if (err) return null;

        return axios
        .get(baseURL + encodeURI(query))
        .then((res) =>
            res.data.results.bindings[0] &&
            res.data.results.bindings[0].dateOfBirthStr &&
            res.data.results.bindings[0].dateOfBirthStr.value
                ? res.data.results.bindings[0].dateOfBirthStr.value
                : null,
        );
    });
};

//Ausgabe Bild
export function getBild (search, language){
    const lang = language || 'de';
    const query = `
    SELECT ?personLabel ?image WHERE {
        BIND(${search}"@${lang} AS ?personLabel) ?person wdt:P18 ?image;          
        rdfs:label ?personLabel.        
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE]de". }
    }
    LIMIT 1
    `;

    return axios.get(baseURL + encodeURI(query)).then((res, err) => {
        if (err) return null;
    return axios
        .get(baseURL + encodeURI(query))
        .then((res) => res.data.results.bindings[0]?.image.value
        );        
        });
};

