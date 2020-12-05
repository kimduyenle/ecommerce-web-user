import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'components/Page';
import TitleBox from 'components/titleBox';
import ProfileAvatar from 'components/profileInfo/profileAvatar';
import ProfileDetails from 'components/profileInfo/profileDetails';
import { localAuthenticate } from 'utils/localAuth';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from 'features/userSlice';
import userAPI from 'api/user';
import useNotification from 'utils/hooks/notification';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: '#fff',
		minHeight: '100%',
		paddingBottom: theme.spacing(9),
		paddingTop: theme.spacing(9)
	}
}));

const ProfileContent = () => {
	const classes = useStyles();
	const { user } = useSelector(state => state.user);
	const { isAuthenticated, tokenInfo } = localAuthenticate();
	const dispatch = useDispatch();
	const { showSuccess, showError } = useNotification();

	const fetchUser = () => {
		dispatch(getProfile());
	};

	const onFileUpload = async image => {
		try {
			if (image !== '') {
				let fileData = new FormData();
				fileData.set('image', image, `${image.lastModified}-${image.name}`);
				await userAPI.uploadAvatar(fileData, user.id);
				await fetchUser();
				showSuccess('Uploaded successfully.');
			}
		} catch (error) {
			showError('Failed to edit user.');
		}
	};

	return (
		<>
			<TitleBox parent='Trang chủ' children='Hồ sơ' path='/' />
			<div className='container'>
				<Page className={classes.root} title='Account'>
					<Container maxWidth='lg'>
						<Grid container spacing={3}>
							<Grid item lg={4} md={6} xs={12}>
								<ProfileAvatar user={{ ...user }} onFileUpload={onFileUpload} />
							</Grid>
							<Grid item lg={8} md={6} xs={12}>
								<ProfileDetails user={{ ...user }} fetchUser={fetchUser} />
							</Grid>
						</Grid>
					</Container>
				</Page>
			</div>
		</>
	);
};

export default ProfileContent;
