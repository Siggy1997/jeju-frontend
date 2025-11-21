function MapDetail({selectedItem, getMapDetail}) {
    return ( 
        <div className="map-detail">
          <button className="close-btn" onClick={() => getMapDetail(null)}>
            ✕
          </button>
          <h3>{selectedItem.name}</h3>
          <p>{selectedItem.address}</p>
          <p>{selectedItem.description}</p>
        </div>
     );
}

export default MapDetail;