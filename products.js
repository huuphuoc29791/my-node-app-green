const products = [
	{
		id: 1,
		name: 'iPhone',
		price: 2899
	},
	{
		id: 2,
		name: 'iPad',
		price: 3599
	},
	{
		id: 3,
		name: 'Macbook',
		price: 3799
	}
];

const getAllProducts = () => {
	return products;
};

const getProductById = id => {
	return products.find(p => p.id == id);
};

module.exports = {
	getAllProducts,
	getProductById
};
