import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { toast, ToastContainer } from 'react-toastify';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { getCurrentLocationInfo } from '../../api/weather-api/WeatherAPI';
import { Grid } from '@material-ui/core';
import SearchBox from '../../components/searchabox/SearchBox';
import { getLocationInfoByAddress } from '../../api/location-api/LocationAPI';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapScreen(props) {
    const [cordinates, setCordinates] = useState({
        latitude: null,
        longitude: null,
    });
    const [markerPopupContent, setMarkerPopupContent] = useState();
    const [searchText, setSearchText] = useState();
    const customMarker = new L.icon({
        iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=",
        iconSize: [25, 42],
        iconAnchor: [12, 42]
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function (position) {
                setCordinates({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                getCurrentLocaInfo(position.coords.latitude, position.coords.longitude);
            });
        } else {
            toast.error('Geolocation is not supported by this browser.');
        }
    }, []);

    const getCurrentLocaInfo = async (latitude, longitude) => {
        let response = await getCurrentLocationInfo(latitude, longitude);
        let localityTrim = (response.locality.split(' ')[0]).trim();
        setMarkerPopupContent(localityTrim);
    }

    const handleChangeSearchContent = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearchContent = async () => {
        if (searchText !== null) {
            let searchTextTrim = searchText.trim();
            let searchTextLocationInfo = await getLocationInfoByAddress(searchTextTrim);

            if (searchTextLocationInfo?.status == 200) {
                setCordinates({
                    latitude: searchTextLocationInfo.data[0]?.lat,
                    longitude: searchTextLocationInfo.data[0]?.lon
                });

                setMarkerPopupContent(searchTextLocationInfo.data[0]?.display_name);
            } else {
                toast.error('Invalid search string!');
            }
        }
    };

    return (
        <div style={{ marginTop: '5%', paddingLeft: '10%' }}>
            <Grid container>
                <Grid xs={12} style={{ position: 'Absolute', zIndex: 1199, top: '12%', right: '10%' }}>
                    <SearchBox inputPlaceHolder="Enter address" onChange={handleChangeSearchContent} onClick={handleSearchContent} />
                </Grid>
                {
                    cordinates?.latitude !== null && cordinates?.longitude !== null &&
                    <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Map center={[cordinates?.latitude, cordinates?.longitude]} zoom={13} style={{ width: '80%', height: '700px' }}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[cordinates?.latitude, cordinates?.longitude]} icon={customMarker}>
                                <Tooltip>
                                    {markerPopupContent}
                                </Tooltip>
                            </Marker>
                        </Map>
                    </Grid>
                }
            </Grid>
            <ToastContainer autoClose={5000} />
        </div >
    );
}

export default MapScreen;