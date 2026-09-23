import { Button } from './Button';

interface ZipSearchProps {
  zip: string;
  onZipChange: (zip: string) => void;
  onGetForecast: () => void;
}

export function ZipSearch({ zip, onZipChange, onGetForecast }: ZipSearchProps) {
  return (
    <div className="zip-search">
      <label htmlFor="zip">Enter a Zip Code</label>
      <div className="zip-search-row">
        <input
          id="zip"
          type="text"
          value={zip}
          onChange={(event) => onZipChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              onGetForecast();
            }
          }}
        />
        <Button onClick={onGetForecast}>Get Forecast</Button>
      </div>
    </div>
  );
}
