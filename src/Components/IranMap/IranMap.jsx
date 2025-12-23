import { useState, useCallback } from 'react';
import { Map, Marker, Popup } from 'react-map-gl';
import '@fontsource/vazirmatn'; 
import Loader from '../Loader/Loader';
function MapPicker({ onAddressChange }) {
  const [viewport, setViewport] = useState({
    latitude: 35.6892,
    longitude: 51.3890,
    zoom: 12,
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState('');

  const getAddress = useCallback(async (lng, lat) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${
          process.env.REACT_APP_MAPBOX_TOKEN
        }&language=fa`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const fetchedAddress = data.features[0].place_name_fa || data.features[0].place_name;
        setAddress(fetchedAddress);
        return fetchedAddress;
      } else {
        setAddress('آدرس یافت نشد');
        return 'آدرس یافت نشد';
      }
    } catch (error) {
      console.error('خطا در دریافت آدرس:', error);
      setAddress('خطا در دریافت آدرس');
      return 'خطا در دریافت آدرس';
    }
  }, []);

  const handleMapClick = useCallback(
    async (event) => {
      if (!event.lngLat) return; 
      const { lng, lat } = event.lngLat;
      setSelectedLocation({ lng, lat });
      setViewport((prev) => ({ ...prev, latitude: lat, longitude: lng }));
      const fetchedAddress = await getAddress(lng, lat);
      if (onAddressChange) {
        onAddressChange(fetchedAddress); 
      }
    },
    [getAddress, onAddressChange]
  );

  return (
    <div style={{ direction: 'rtl', fontFamily: 'Vazirmatn, sans-serif' }}>
      {process.env.REACT_APP_MAPBOX_TOKEN ? (
        <Map
          initialViewState={viewport}
          onMove={(evt) => setViewport(evt.viewState)}
          style={{ width: '100%', height: '500px' }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onClick={handleMapClick}
        >
          {selectedLocation && (
            <Marker longitude={selectedLocation.lng} latitude={selectedLocation.lat}>
              <div style={{ color: 'red', fontSize: '24px' }}>📍</div>
              <Popup
                longitude={selectedLocation.lng}
                latitude={selectedLocation.lat}
                closeOnClick={false}
                onClose={() => {
                  setSelectedLocation(null);
                  setAddress('');
                }}
              >
                <div style={{ fontFamily: 'Vazirmatn, sans-serif' }}>
                  {address || 'در حال دریافت آدرس...'}
                </div>
              </Popup>
            </Marker>
          )}
        </Map>
      ) : (
        <p>توکن Mapbox یافت نشد. لطفاً توکن را در .env تنظیم کنید.</p>
      )}
      {address && (
        <div style={{ marginTop: '10px' }}>
          <h3>آدرس انتخاب‌شده:</h3>
          <p>{address || <Loader/>}</p>
          <button
            onClick={() => {
              alert(`آدرس ذخیره شد: ${address}`);
            }}
          >
            ذخیره آدرس
          </button>
        </div>
      )}
    </div>
  );
}

function IranMap() {
  const [savedAddress, setSavedAddress] = useState('');

  const handleAddressChange = useCallback((address) => {
    setSavedAddress(address);
    console.log('آدرس ذخیره‌شده:', address);
  }, []);

  return (
    <div style={{ direction: 'rtl', fontFamily: 'Vazirmatn, sans-serif', padding: '20px' }}>
      <h2>انتخاب آدرس</h2>
      <MapPicker onAddressChange={handleAddressChange} />
      {savedAddress && (
        <div style={{ marginTop: '20px' }}>
          <h3>آدرس ذخیره‌شده:</h3>
          <p>{savedAddress || 'نامشخص'}</p>
        </div>
      )}
    </div>
  );
}

export default IranMap;