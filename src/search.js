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
    SELECT ?itemLabel ?placeOfBirthLabel WHERE {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
                wikibase:api "EntitySearch";
                mwapi:search "${search}";
                mwapi:language "${lang}".
            ?item wikibase:apiOutputItem mwapi:item.            
            }
        ?item wdt:P19 ?placeOfBirth.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${lang}". }
    } LIMIT 1
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
    const lang = language || 'de';
    const query = `
    SELECT ?itemLabel ?countryLabel WHERE {
    SERVICE wikibase:mwapi {
        bd:serviceParam wikibase:endpoint "www.wikidata.org";
            wikibase:api "EntitySearch";
            mwapi:search "${search}";
            mwapi:language "${lang}".
        ?item wikibase:apiOutputItem mwapi:item.            
    }
    ?item wdt:P19 ?placeOfBirth.
    ?placeOfBirth (wdt:P17+) ?country.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${lang}". }
    } LIMIT 1
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

//Ausgabe des GeburtsDatum
export function getGeburtsDatum (search, language){
    const lang = 'de';
    const query = `    
    SELECT ?itemLabel (CONCAT(STR(DAY(?dateOfBirth)),".",STR(MONTH(?dateOfBirth)),".",STR(YEAR(?dateOfBirth))) as ?dateOfBirthStr) WHERE {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
                wikibase:api "EntitySearch";
                mwapi:search "${search}";
                mwapi:language "${lang}".
            ?item wikibase:apiOutputItem mwapi:item.            
        }
        ?item wdt:P569 ?dateOfBirth.
         SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${lang}". }
      } LIMIT 1
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
     SELECT ?itemLabel ?pic WHERE {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
                wikibase:api "EntitySearch";
                mwapi:search "${search}";
                mwapi:language "${lang}".
            ?item wikibase:apiOutputItem mwapi:item.            
        }
        ?item wdt:P18 ?pic.
         SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${lang}". }
      } LIMIT 1
    `;

    return axios.get(baseURL + encodeURI(query)).then((res, err) => {
        if (err) return null;

        return axios
        .get(baseURL + encodeURI(query))
        .then((res) =>
            res.data.results.bindings[0] &&
            res.data.results.bindings[0].pic &&
            res.data.results.bindings[0].pic.value
                ? res.data.results.bindings[0].pic.value
                : null,
        );
    });
};

//Ausgabe des Berufs
export function getBeruf (search, language){
    const lang = language || 'de';
    const query = `
    SELECT ?itemLabel ?occupationLabel WHERE {  
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
                wikibase:api "EntitySearch";
                mwapi:search "${search}";
                mwapi:language "${lang}".
            ?item wikibase:apiOutputItem mwapi:item.            
        }  
        ?item wdt:P106 ?occupation.  
         SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${lang}". }
      } LIMIT 1
    `;

   return axios.get(baseURL + encodeURI(query)).then((res, err) => {
        if (err) return null;

        return axios
        .get(baseURL + encodeURI(query))
        .then((res) =>
            res.data.results.bindings[0] &&
            res.data.results.bindings[0].occupationLabel &&
            res.data.results.bindings[0].occupationLabel.value
                ? res.data.results.bindings[0].occupationLabel.value
                : null,
        );
    });
};

//Ausgabe des vollständigen Namens
export function getFName (search, language){
    const lang = language || 'de';
    const query = `
    SELECT ?itemLabel ?givenNameLabel WHERE {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
                wikibase:api "EntitySearch";
                mwapi:search "${search}";
                mwapi:language "${lang}".
            ?item wikibase:apiOutputItem mwapi:item.            
        }        
        ?item wdt:P735 ?givenName.        
         SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${lang}". }
      } LIMIT 1
    `;

   return axios.get(baseURL + encodeURI(query)).then((res, err) => {
        if (err) return null;

        return axios
        .get(baseURL + encodeURI(query))
        .then((res) =>
            res.data.results.bindings[0] &&
            res.data.results.bindings[0].givenNameLabel &&
            res.data.results.bindings[0].givenNameLabel.value
                ? res.data.results.bindings[0].givenNameLabel.value
                : null,
        );
    });
};

export function getLName (search, language){
    const lang = language || 'de';
    const query = `
    SELECT ?itemLabel ?givenNameLabel WHERE {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
                wikibase:api "EntitySearch";
                mwapi:search "${search}";
                mwapi:language "${lang}".
            ?item wikibase:apiOutputItem mwapi:item.            
        }        
        ?item wdt:P734 ?givenName.        
         SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${lang}". }
      } LIMIT 1
    `;

   return axios.get(baseURL + encodeURI(query)).then((res, err) => {
        if (err) return null;

        return axios
        .get(baseURL + encodeURI(query))
        .then((res) =>
            res.data.results.bindings[0] &&
            res.data.results.bindings[0].givenNameLabel &&
            res.data.results.bindings[0].givenNameLabel.value
                ? res.data.results.bindings[0].givenNameLabel.value
                : null,
        );
    });
};




