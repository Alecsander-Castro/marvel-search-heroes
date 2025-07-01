interface InputSearchProps {
  searchHero: string;
  setSearchHero: (value: string) => void;
  handleSearchHero: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const InputSearch = ({
  searchHero,
  setSearchHero,
  handleSearchHero,
}: InputSearchProps) => {
  return (
    <input
      value={searchHero}
      onChange={(e) => setSearchHero(e.target.value)}
      onKeyDown={handleSearchHero}
      type="text"
      placeholder="Procure por heróis"
    />
  );
};
