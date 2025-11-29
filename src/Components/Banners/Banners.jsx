import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';



const Banner = ({ banner }) => {
	const isLarge = banner.category === 'large';

	const CustomLink = ({ to, children, className }) => <a href={to} className={className}>{children}</a>;
	const ComponentLink = typeof Link !== 'undefined' ? Link : CustomLink;


	return (
		<div
			className={`banner-card relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] 
        ${isLarge ? 'banner-card--large h-64' : 'banner-card--small h-40'}`
			}
			style={{
				backgroundImage: `url(${banner.image})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className="banner-card__body absolute inset-0 flex flex-col justify-between items-start p-4 md:p-6 bg-black bg-opacity-10">
				{banner.discount && (
					<div className="banner-card__discount bg-red-600 text-white rounded-full px-3 py-1 text-sm font-bold">
						<p className="banner-card__discount-text">
							{banner.discount}% تخفیف
						</p>
					</div>
				)}

				<h6 className="banner-card__title text-white text-lg md:text-xl font-bold mt-auto drop-shadow-lg">
					{banner.title}
				</h6>

				<button className="btn-primary bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition-colors">
					<ComponentLink to={`/category/${banner.productCategory}`} className="banner-card__link block">
						خرید
					</ComponentLink>
				</button>
			</div>
		</div>
	);
};


const LargeBanner = ({ banners }) => {
	const largeBanner = banners.find(b => b.category === 'large');
	if (!largeBanner) return null;

	return (
		<div className="mb-4">
			<div className="w-full">
				<Banner banner={largeBanner} />
			</div>
		</div>
	);
};


const SmallBannerList = ({ banners }) => {
	const smallBanners = banners.filter(b => b.category !== 'large');
	const firstRow = smallBanners.slice(0, 2);
	const secondRow = smallBanners.slice(2, 6);

	return (
		<div className="sm:px-6 mb-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
				{firstRow.map(b => (
					<div key={b.id}>
						<Banner banner={b} />
					</div>
				))}
			</div>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{secondRow.map(b => (
					<div key={b.id}>
						<Banner banner={b} />
					</div>
				))}
			</div>
		</div>
	);
};

Banner.propTypes = {
	banner: PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		discount: PropTypes.number,
		image: PropTypes.string.isRequired,
		category: PropTypes.string,
		productCategory: PropTypes.string,
	}).isRequired,
};

LargeBanner.propTypes = {
	banners: PropTypes.array.isRequired,
};
SmallBannerList.propTypes = {
	banners: PropTypes.array.isRequired,
};

export { LargeBanner, SmallBannerList };