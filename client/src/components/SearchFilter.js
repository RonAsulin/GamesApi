import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";


function SearchFilter({ genres, onFilterSubmit, onReset }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [genreFilter, setGenreFilter] = useState("");

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prevRange) => ({
      ...prevRange,
      [name]: parseInt(value),
    }));
  };

  const handleGenreFilterChange = (e) => {
    setGenreFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filters = {
      searchQuery,
      priceRange,
      genreFilter,
    };

    onFilterSubmit(filters);
  };

  const handleReset = () => {
    setSearchQuery("");
    setPriceRange({ min: "", max: ""});
    setGenreFilter("");
    onReset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="Search by game name"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </Col>
        <Col>
          <Form.Control
            type="number"
            placeholder="Min Price"
            name="min"
            value={priceRange.min}
            onChange={handlePriceRangeChange}
          />
        </Col>
        <Col>
            <Form.Control
            type="number"
            placeholder="Max Price"
            name="max"
            value={priceRange.max}
            onChange={handlePriceRangeChange}
            />
            
        </Col>
        <Col>
          <Form.Control as="select" value={genreFilter} onChange={handleGenreFilterChange}>
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.genreId} value={genre.genreName}>
                {genre.genreName}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col style={{padding:4}}>
          <Button  type="submit">Filter</Button>
          <Button style={{marginLeft:10}} variant="danger" onClick={handleReset}>Reset</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchFilter;
