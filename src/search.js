import axios from 'axios';

const baseURL =
    'https://query.wikidata.org/sparql?format=json&query=';

const language = 'de';

//Ausgabe ID der Suche
export function getWikiId (search){    
    const query = `
    SELECT * WHERE {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
            wikibase:api "EntitySearch";
            mwapi:search "${search}";
            mwapi:language "${language}".
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
export function getGeburtsOrt (search){    
    const query = `
    SELECT ?itemLabel ?placeOfBirthLabel WHERE {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
            wikibase:api "EntitySearch";
            mwapi:search "${search}";
            mwapi:language "${language}".
            ?item wikibase:apiOutputItem mwapi:item.            
        }
        ?item wdt:P19 ?placeOfBirth.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE], en". }
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
export function getGeburtsLand (search){    
    const query = `
    SELECT ?itemLabel ?countryLabel WHERE {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
            wikibase:api "EntitySearch";
            mwapi:search "${search}";
            mwapi:language "${language}".
            ?item wikibase:apiOutputItem mwapi:item.            
        }
        ?item wdt:P19 ?placeOfBirth.
        ?placeOfBirth (wdt:P17+) ?country.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${language}". }
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

//Ausgabe SterbeOrt
export function getSterbeOrt (search){ 
    const query = `
    SELECT ?itemLabel ?placeOfDeathLabel WHERE {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
            wikibase:api "EntitySearch";
            mwapi:search "${search}";
            mwapi:language "${language}".
            ?item wikibase:apiOutputItem mwapi:item.            
        }
        ?item wdt:P20 ?placeOfDeath.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${language}". }
    } LIMIT 1
    `;

    return axios.get(baseURL + encodeURI(query)).then((res, err) => {
        if (err) return null;

        return axios
        .get(baseURL + encodeURI(query))
        .then((res) =>
            res.data.results.bindings[0] &&
            res.data.results.bindings[0].placeOfDeathLabel &&
            res.data.results.bindings[0].placeOfDeathLabel.value
                ? res.data.results.bindings[0].placeOfDeathLabel.value
                : null,
        );
    });
};

//Ausgabe SterbeLand
export function getSterbeLand (search){    
    const query = `
    SELECT ?itemLabel ?countryLabel WHERE {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
            wikibase:api "EntitySearch";
            mwapi:search "${search}";
            mwapi:language "${language}".
            ?item wikibase:apiOutputItem mwapi:item.            
        }
        ?item wdt:P20 ?placeOfDeath.
        ?placeOfDeath (wdt:P17+) ?country.
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${language}". }
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
export function getGeburtsDatum (search){  
    const query = `    
    SELECT ?itemLabel (CONCAT(STR(DAY(?dateOfBirth)),".",STR(MONTH(?dateOfBirth)),".",STR(YEAR(?dateOfBirth))) as ?dateOfBirthStr) WHERE {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
            wikibase:api "EntitySearch";
            mwapi:search "${search}";
            mwapi:language "${language}".
            ?item wikibase:apiOutputItem mwapi:item.            
        }
        ?item wdt:P569 ?dateOfBirth.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${language}". }
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

//Ausgabe des TodesTages
export function getSterbeDatum (search){
    const query = `    
    SELECT ?itemLabel (CONCAT(STR(DAY(?dateOfDeath)),".",STR(MONTH(?dateOfDeath)),".",STR(YEAR(?dateOfDeath))) as ?dateOfDeathStr) WHERE {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
            wikibase:api "EntitySearch";
            mwapi:search "${search}";
            mwapi:language "${language}".
            ?item wikibase:apiOutputItem mwapi:item.            
        }
        ?item wdt:P570 ?dateOfDeath.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${language}". }
    } LIMIT 1
    `;

    return axios.get(baseURL + encodeURI(query)).then((res, err) => {
        if (err) return null;

        return axios
        .get(baseURL + encodeURI(query))
        .then((res) =>
            res.data.results.bindings[0] &&
            res.data.results.bindings[0].dateOfDeathStr &&
            res.data.results.bindings[0].dateOfDeathStr.value
                ? res.data.results.bindings[0].dateOfDeathStr.value
                : null,
        );
    });
};

//Ausgabe Bild
export function getBild (search){
    const query = `
    SELECT ?itemLabel ?pic WHERE {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
            wikibase:api "EntitySearch";
            mwapi:search "${search}";
            mwapi:language "${language}".
            ?item wikibase:apiOutputItem mwapi:item.            
        }
        ?item wdt:P18 ?pic.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${language}". }
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
export function getBeruf (search){  
    const query = `
    SELECT ?itemLabel ?occupationLabel WHERE {  
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
            wikibase:api "EntitySearch";
            mwapi:search "${search}";
            mwapi:language "${language}".
            ?item wikibase:apiOutputItem mwapi:item.            
        }  
        ?item wdt:P106 ?occupation.  
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${language}". }
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

//Ausgabe des Vornamen
export function getFName (search){
    const query = `
    SELECT ?itemLabel ?givenNameLabel WHERE {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
            wikibase:api "EntitySearch";
            mwapi:search "${search}";
            mwapi:language "${language}".
            ?item wikibase:apiOutputItem mwapi:item.            
        }        
        ?item wdt:P735 ?givenName.        
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${language}". }
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

//Ausgabe des Nachnamen
export function getLName (search){
    const query = `
    SELECT ?itemLabel ?givenNameLabel WHERE {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
            wikibase:api "EntitySearch";
            mwapi:search "${search}";
            mwapi:language "${language}".
            ?item wikibase:apiOutputItem mwapi:item.            
        }        
        ?item wdt:P734 ?givenName.        
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${language}". }
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

//Ausgabe des Geschlechts
export function getGeschlecht (search){;
    const query = `
    SELECT ?itemLabel ?geschlechtLabel WHERE {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
            wikibase:api "EntitySearch";
            mwapi:search "${search}";
            mwapi:language "${language}".
            ?item wikibase:apiOutputItem mwapi:item.            
        }        
        ?item wdt:P21 ?geschlecht.        
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${language}". }
    } LIMIT 1
    `;

   return axios.get(baseURL + encodeURI(query)).then((res, err) => {
        if (err) return null;

        return axios
        .get(baseURL + encodeURI(query))
        .then((res) =>
            res.data.results.bindings[0] &&
            res.data.results.bindings[0].geschlechtLabel &&
            res.data.results.bindings[0].geschlechtLabel.value
                ? res.data.results.bindings[0].geschlechtLabel.value
                : null,
        );
    });
};

//Ausgabe des EntityTypes
export function getType (search){
    const query = `
    SELECT ?itemLabel ?typeLabel WHERE {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
            wikibase:api "EntitySearch";
            mwapi:search "${search}";
            mwapi:language "${language}".
            ?item wikibase:apiOutputItem mwapi:item.            
        }        
        ?item wdt:P31 ?type.       
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${language}". }
    } LIMIT 1
    `;

   return axios.get(baseURL + encodeURI(query)).then((res, err) => {
        if (err) return null;

        return axios
        .get(baseURL + encodeURI(query))
        .then((res) =>
            res.data.results.bindings[0] &&
            res.data.results.bindings[0].typeLabel &&
            res.data.results.bindings[0].typeLabel.value
                ? res.data.results.bindings[0].typeLabel.value
                : null,
        );
    });
};

//Ausgabe der TodesArt
export function getTodesArt (search){
    const query = `
    SELECT ?itemLabel ?mannerOfDeathLabel WHERE {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
            wikibase:api "EntitySearch";
            mwapi:search "${search}";
            mwapi:language "${language}".
            ?item wikibase:apiOutputItem mwapi:item.            
        }        
        ?item wdt:P1196 ?mannerOfDeath.       
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${language}". }
    } LIMIT 1
    `;

   return axios.get(baseURL + encodeURI(query)).then((res, err) => {
        if (err) return null;

        return axios
        .get(baseURL + encodeURI(query))
        .then((res) =>
            res.data.results.bindings[0] &&
            res.data.results.bindings[0].mannerOfDeathLabel &&
            res.data.results.bindings[0].mannerOfDeathLabel.value
                ? res.data.results.bindings[0].mannerOfDeathLabel.value
                : null,
        );
    });
};

//Ausgabe der TodesGrund
export function getTodesUrsache (search){
    const query = `
    SELECT ?itemLabel ?causeOfDeathLabel WHERE  {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
            wikibase:api "EntitySearch";
            mwapi:search "${search}";
            mwapi:language "${language}".
            ?item wikibase:apiOutputItem mwapi:item.            
        }        
        ?item wdt:P509 ?causeOfDeath.       
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${language}". }
    } LIMIT 1
    `;

   return axios.get(baseURL + encodeURI(query)).then((res, err) => {
        if (err) return null;

        return axios
        .get(baseURL + encodeURI(query))
        .then((res) =>
            res.data.results.bindings[0] &&
            res.data.results.bindings[0].causeOfDeathLabel &&
            res.data.results.bindings[0].causeOfDeathLabel.value
                ? res.data.results.bindings[0].causeOfDeathLabel.value
                : null,
        );
    });
};

//Ausgabe des Vaters
export function getVater (search){
    const query = `
    SELECT ?itemLabel ?fatherLabel WHERE  {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
            wikibase:api "EntitySearch";
            mwapi:search "${search}";
            mwapi:language "${language}".
            ?item wikibase:apiOutputItem mwapi:item.            
        }        
        ?item wdt:P22 ?father.       
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${language},en". }
    } LIMIT 1
    `;

   return axios.get(baseURL + encodeURI(query)).then((res, err) => {
        if (err) return null;

        return axios
        .get(baseURL + encodeURI(query))
        .then((res) =>
            res.data.results.bindings[0] &&
            res.data.results.bindings[0].fatherLabel &&
            res.data.results.bindings[0].fatherLabel.value
                ? res.data.results.bindings[0].fatherLabel.value
                : null,
        );
    });
};

export function getMutter (search){
    const query = `
    SELECT ?itemLabel ?motherLabel WHERE  {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
            wikibase:api "EntitySearch";
            mwapi:search "${search}";
            mwapi:language "${language}".
            ?item wikibase:apiOutputItem mwapi:item.            
        }        
        ?item wdt:P25 ?mother.      
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${language},en". }
    } LIMIT 1
    `;

   return axios.get(baseURL + encodeURI(query)).then((res, err) => {
        if (err) return null;

        return axios
        .get(baseURL + encodeURI(query))
        .then((res) =>
            res.data.results.bindings[0] &&
            res.data.results.bindings[0].motherLabel &&
            res.data.results.bindings[0].motherLabel.value
                ? res.data.results.bindings[0].motherLabel.value
                : null,
        );
    });
};






