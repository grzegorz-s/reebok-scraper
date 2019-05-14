import axios from 'axios';
import cheerio from 'cheerio';

export async function getHtml(url) {
  const { data: html } = await axios.get(url);
  return html;
}

export async function getProducts(html) {
  const serializedProducts = [];
  const $ = cheerio.load(html);
  const allProducts = $('.product-tile');

  allProducts.each((i, product) => {
    const price = $(product)
      .find('.price')
      .data();

    const info = $(product)
      .find('.product-info-inner-content .product-link')
      .data();

    const productData = {
      ...info,
      ...price
    };

    return serializedProducts.push(productData);
  });

  return serializedProducts;
}
