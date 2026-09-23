import type { Favorite } from '../types';
import { Button } from './Button';

interface FavoritesControlsProps {
  favorites: Favorite[];
  selectedFavoriteId: string;
  onSelectedFavoriteChange: (id: string) => void;
  onAddFavorite?: () => void;
  onDeleteFavorite?: () => void;
  onGoToFavorite?: (zip: string) => void;
}

export function FavoritesControls({
  favorites,
  selectedFavoriteId,
  onSelectedFavoriteChange,
  onAddFavorite,
  onDeleteFavorite,
  onGoToFavorite,
}: FavoritesControlsProps) {
  return (
    <div className="favorites-controls">
      <Button onClick={onAddFavorite}>Add to Favorites</Button>

      <label className="favorite-select-label">
        Go to favorite:
        <select
          value={selectedFavoriteId}
          onChange={(event) => {
            const id = event.target.value;
            onSelectedFavoriteChange(id);
            const favorite = favorites.find((item) => item.id === id);
            if (favorite) {
              onGoToFavorite?.(favorite.zip);
            }
          }}
        >
          <option value="">Select a zip</option>
          {favorites.map((favorite) => (
            <option key={favorite.id} value={favorite.id}>
              {favorite.zip}
            </option>
          ))}
        </select>
      </label>

      <Button onClick={onDeleteFavorite}>Delete Favorite</Button>
    </div>
  );
}
