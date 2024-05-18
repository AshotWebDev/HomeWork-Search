

const SearchComponent = ({ search, handleSearchChange }: { search: string, handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div>
            <h1>planets</h1>
            <input type="text" value={search} onChange={handleSearchChange} />
    </div>
  )
}

export default SearchComponent  