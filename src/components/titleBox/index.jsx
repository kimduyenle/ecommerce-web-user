import React from 'react';
import { useHistory } from 'react-router-dom';

const TitleBox = ({ parent, children, path }) => {
	const history = useHistory();
	return (
		<div className='all-title-box'>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-12'>
						<h2>{children}</h2>
						<ul className='breadcrumb'>
							<li className='breadcrumb-item'>
								<a
									onClick={e => {
										e.preventDefault();
										history.push(path);
									}}
									href={path}
								>
									{parent}
								</a>
							</li>
							<li className='breadcrumb-item active'>{children} </li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TitleBox;
