import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import styled from "styled-components";

export default function LocationSearchInput({
  address,
  setAddress,
  handleSetSuggestion,
}: {
  address: string;
  setAddress: (address: string) => void;
  handleSetSuggestion: (
    address: string,
    placeId: string,
    latLng: { lat: number; lng: number }
  ) => void;
}) {
  const handleSelect = async (address: string) => {
    try {
      setAddress(address);

      const results = await geocodeByAddress(address);

      const placeId = results[0].place_id;
      const latLng = await getLatLng(results[0]);

      return handleSetSuggestion(address, placeId, latLng);
    } catch (error) {
      console.error("Error", error);
    }
  };

  React.useEffect(() => {
    return () => setAddress("");
  }, []);

  return (
    <PlacesAutocomplete
      value={address}
      onChange={(value: string) => setAddress(value)}
      onSelect={handleSelect}
    >
      {({
        getInputProps,
        suggestions,
        getSuggestionItemProps,
        loading,
      }: {
        getInputProps: any;
        suggestions: any;
        getSuggestionItemProps: any;
        loading: boolean;
      }) => (
        <div style={{ width: "100%" }}>
          <InputStyled
            {...getInputProps({
              placeholder: "Procurar local...",
              className: "location-search-input",
            })}
          />
          <div style={{ width: "100%" }}>
            {loading && <div>Carregano...</div>}
            {suggestions.map((suggestion: any, index: number) => {
              console.log("SUG", suggestion);

              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  key={index}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span style={{ color: "black" }}>
                    {suggestion.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

const InputStyled = styled.input`
  width: 100%;
  height: 30px;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;
