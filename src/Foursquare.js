
const CLIENT_ID = 'DQQCTQ2PUZ3Y0VAOOVK5NIVUWQ44TXJMXAA3TIRIYCJWKAIU';
const SECRET = 'DOZSEZWJFDOL2WACHQN2IYHFWREPIUJPKHGCVYYGP5YR0KZJ';
const V = '20180323';
const LIMIT = 10;

const QUERY = `client_secret=${SECRET}&client_id=${CLIENT_ID}&v=${V}&limit=${LIMIT}`;

const FOURSQUARE_API = 'https://api.foursquare.com/v2/venues/explore';

export const getItems = (ll, interest) => {
    const queryOfInterest = `${QUERY}&ll=${ll.lat},${ll.lng}&query=${interest}`;

    return fetch(`${FOURSQUARE_API}?${queryOfInterest}`)
        .then(r => r.json())
        .then(r => {
            if (!r.response.groups || r.response.groups.length == 0) {
                return [];
            } else {
                return r.response.groups[0].items;
            }
        });
}
