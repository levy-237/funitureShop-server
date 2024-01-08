const Product = require("../models/products");

//// PAGINATION HAVE TO BE COMPLETED !!!!!!!
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, numericFilters, limit } = req.query;
  ///Creating OBJECT where all the queries will be together
  const queryObject = {};
  /// checking queries
  featured ? (queryObject.featured = featured === "true" ? true : false) : null;
  company ? (queryObject.company = company) : null;
  name ? (queryObject.name = new RegExp(name, "i")) : null;
  if (numericFilters) {
    // Creating a map to convert comparison operators to their MongoDB equivalents
    const operatorMap = {
      ">": "$gt",
      "%3E": "$gte",
      "=": "$eq",
      "<": "$lt",
      "%3C": "$lte",
    };

    // Defining a regular expression to match comparison operators in strings
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;

    // Replacing comparison operators in 'numericFilters' with MongoDB equivalents
    let filters = numericFilters.replace(
      regEx,
      // For each matched operator, replace it with its MongoDB counterpart surrounded by -
      (match) => `-${operatorMap[match]}-`
    );

    // Defining available options for filtering
    const options = ["price", "rating"];

    // Splitting the 'filters' string into individual conditions and apply to 'queryObject'
    filters = filters.split(",").forEach((item) => {
      // Split each filter into its components: field, operator, and value
      const [field, operator, value] = item.split("-");

      // Checking if the field is one of the available options for filtering
      if (options.includes(field)) {
        // Construct the queryObject with the field and its corresponding operator and value
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject).limit(limit);
  //// sorting products based on users need.by default by date of product creation.
  sort ? (result = result.sort(sort)) : (result = result.sort("createAt"));
  // limit ? result.limit(limit) : null;
  const products = await result;
  res.status(201).json({ nbHits: products.length, products });
};

const getProduct = async (req, res) => {
  const productID = req.params.id;
  const product = await Product.findOne({ _id: productID });
  res.status(201).json({ product });
};
module.exports = { getAllProducts, getProduct };
