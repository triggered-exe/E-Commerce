import React, { useState } from 'react';
import styles from './Home.module.css';
import { Dna } from 'react-loader-spinner';

import { useProductContext } from '../../context/productContext';

function Home() {
  const { loading, products, addToCart } = useProductContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
    

  const filteredProducts = products.filter((product) => {
    // Filter by search query
    const titleMatches = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by selected categories
    const categoryMatches = selectedCategories.length === 0 || selectedCategories.includes(product.category);

    // Filter by price range
    const priceMatches = product.price >= priceRange[0] && product.price <= priceRange[1];

    return titleMatches && categoryMatches && priceMatches;
  });

  const toggleCategoryFilter = (category) => {
    
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // for loading state
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Dna
          visible={true}
          height="100"
          width="100"
          ariaLabel="dna-loading"
        />
      </div>
    );
  }
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search your product here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className={styles.productsContainer}>
          {filteredProducts.map((product) => (
            <div className={styles.productsList} key={product.id}>
              <img src={product.image} alt="" />
              <div className={styles.productDetails}>
                <h3>{product.title}</h3>
                <b>₹ {product.price}</b>
                <button onClick={() => addToCart(product)}>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.filterContainer}>
          <div>
            <h3>Category</h3>
            <label>
              <input
                type="checkbox"
                value="men's clothing"
                checked={selectedCategories.includes("men's clothing")}
                onChange={() => toggleCategoryFilter("men's clothing")}
              />
              Men's Clothing
            </label>
            <label>
              <input
                type="checkbox"
                value="women's clothing"
                checked={selectedCategories.includes("women's clothing")}
                onChange={() => toggleCategoryFilter("women's clothing")}
              />
              Women's Clothing
            </label>
            <label>
              <input
                type="checkbox"
                value="jewelery"
                checked={selectedCategories.includes("jewelry")}
                onChange={() => toggleCategoryFilter("jewelry")}
              />
              Jewelry
            </label>
            <label>
              <input
                type="checkbox"
                value="electronics"
                checked={selectedCategories.includes("electronics")}
                onChange={() => toggleCategoryFilter("electronics")}
              />
              Electronics
            </label>
          </div>
          <div>
            <h3>Price Range</h3>
            <input
              type="range"
              min={0}
              max={1000}
              step={10}
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
            />
            <input
              type="range"
              min={0}
              max={1000}
              step={10}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
            />
            <div>
              Min: ₹{priceRange[0]}, Max: ₹{priceRange[1]}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
