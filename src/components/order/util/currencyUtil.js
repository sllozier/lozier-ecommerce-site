export const currencyFormat = (num) => {
	let formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

	return formatter.format(num / 100);
};