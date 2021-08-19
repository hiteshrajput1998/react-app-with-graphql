import axios from 'axios';

export const getLocationInfoByAddress = async (address) => {
    return await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.d18ef901c0ba37bf6c53ceb5a01ce506&q=${address}&format=json`)
        .then(response => {
            return response;
        })
        .catch(err => {
            return err;
        })
};