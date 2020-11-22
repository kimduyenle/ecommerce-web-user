const formatDate = dateString => {
	const date = new Date(dateString);
	const dd = date.getDate();
	const mm = date.getMonth() + 1;
	const yyyy = date.getFullYear();
	const h = date.getHours();
	const m = date.getMinutes();
	const s = date.getSeconds();
	return `${dd}/${mm}/${yyyy} ${h}:${m}:${s}`;
};

export default formatDate;
